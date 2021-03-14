import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Member} from '../../../../store/member/member.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Group} from '../../../../store/group/group.model';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {Observable} from 'rxjs';
import {Payment} from '../../../../store/payment/payment.model';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import * as paymentSelector from '../../../../store/payment/payment.selectors';

@Component({
  selector: 'app-contribution-by-period',
  templateUrl: './contribution-by-period.component.html',
  styleUrls: ['./contribution-by-period.component.scss'],
  animations: [fadeIn]
})
export class ContributionByPeriodComponent implements OnInit {

  @Input() members: Member[];
  @Input() contributionTypes: ContributionType[];
  @Input() group: Group;
  @Output() closeForm = new EventEmitter();

  currentContributionType: ContributionType;
  year = new Date().getFullYear();
  years = [];
  month: string;
  contributionType;
  membersAmount = {};
  memberTotals = {};
  grandTotal = 0;
  loading = false;
  monthName = '';
  contributions$: Observable<Payment[]>;
  memberSearch;

  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>,
  ) {
    this.contributions$ = this.store.pipe(select(paymentSelector.selectContributionByMonth(this.month, this.year)));
  }

  ngOnInit(): void {
    if (this.contributionTypes && this.contributionTypes.length === 1) {
      this.contributionType = this.contributionTypes[0].id;
      this.setContributionType(this.contributionType);
    }
    this.generateYears();
    this.initiateMembers();
  }

  initiateMembers() {
    this.members.forEach(i => {
      this.membersAmount[i.id] = {};
      this.memberTotals[i.id] = 0;
      this.contributionTypes.forEach(contr => {
        if (contr.is_must && contr.is_fixed) {
          this.membersAmount[i.id][contr.id] = contr.fixed_value;
        }
      });
    });
    this.calculateTotal();
  }

  setContributionType(value: any) {
    this.currentContributionType = this.contributionTypes.find(i => i.id === value);
  }

  generateYears() {
    this.years = [];
    const currentYear = new Date().getFullYear();
    for (let i = -5; i < 10; i++) {
      this.years.push(currentYear + i);
    }
  }

  calculateTotal() {
    this.grandTotal = 0;
    this.members.forEach(member => {
      this.memberTotals[member.id] = 0;
      this.contributionTypes.forEach(contr => {
        const amount = this.membersAmount[member.id][contr.id] + '';
        if (!!amount) {
          this.memberTotals[member.id] += parseFloat(amount);
          this.grandTotal += parseFloat(amount);
        }
      });
    });
  }

  async save() {
    const membersData = Object.keys(this.membersAmount).map(i => {
      return {
        groupId: this.group.id,
        memberId: i,
        amountTaken: this.memberTotals[i],
        loans: {},
        fines: {},
        contributions: this.membersAmount[i],
        date: this.commonService.formatDate(new Date(`${this.year}-${this.month}-01`)),
        year: this.year,
        month: this.month,
        referenceNumber: '',
        paymentMode: '',
      };
    });
    this.loading = true;
    try {
      await this.functionsService.saveData('addPastContributions', {
        groupId: this.group.id,
        membersData
      });
      this.loading = false;
      this.commonService.showSuccess('Contributions Submitted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Contributions was not assigned successful');
      console.error(e);
    }
  }

  onClose() {
    this.closeForm.emit();
  }

  setMonth(value: any) {
    const monts = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',  'Dec'];
    const monthValue = parseInt(value, 10);
    this.monthName = monts[monthValue - 1] + ' ' + this.year;
    this.contributions$ = this.store.pipe(select(paymentSelector.selectContributionByMonth(this.month, this.year)));
  }
}
