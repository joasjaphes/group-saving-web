import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from '../../../../store/member/member.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Group} from '../../../../store/group/group.model';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import {Observable} from 'rxjs';
import {Payment} from '../../../../store/payment/payment.model';
import * as paymentSelector from '../../../../store/payment/payment.selectors';

@Component({
  selector: 'app-contribution-by-member',
  templateUrl: './contribution-by-member.component.html',
  styleUrls: ['./contribution-by-member.component.scss'],
  animations: [fadeIn]
})
export class ContributionByMemberComponent implements OnInit {
  @Input() members: Member[];
  @Input() contributionTypes: ContributionType[];
  @Input() group: Group;
  @Output() closeForm = new EventEmitter();

  currentMember: Member;
  excludedPeriods = [];
  years = [];
  memberId;
  searchMembers;
  monthsDatas = [];
  memberTotals = {};
  month;
  year;
  totals = {};
  contributionDate: any;
  grandTotal = 0;
  contributionTotal = {};
  loading: any;

  memberContributions$: Observable<Payment[]>;

  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>
  ) {
    this.memberContributions$ = this.store.pipe(select(paymentSelector.selectContributionOnlyByMember(this.memberId)));
  }

  ngOnInit(): void {}

  setDate() {
    const contributions = {};
    this.contributionTypes.forEach(contr => {
      if (contr.is_fixed && contr.is_must) {
        contributions[contr.id] = contr.fixed_value;
      }
    });
    this.monthsDatas.push({
      id: this.commonService.makeId(),
      year: '',
      month: '',
      memberId: this.memberId,
      date: this.contributionDate,
      contributions,
      total: 0,
    });
    this.contributionDate = '';
    this.calculateTotal();
  }

  calculateTotal() {
    this.grandTotal = 0;
    this.monthsDatas.forEach(i => {
      i.total = 0;
      this.memberTotals[i.id] = 0;
      Object.keys(i.contributions).forEach(contr => {
        i.total += !!(i.contributions[contr] + '') ? parseFloat(i.contributions[contr] + '') : 0;
      });
    });
    this.contributionTypes.forEach(contr => {
      this.contributionTotal[contr.id] = 0;
      this.monthsDatas.forEach(data => {
        const amount = data.contributions[contr.id] ? data.contributions[contr.id] + '' : '0';
        if (!!amount) {
          this.contributionTotal[contr.id] += parseFloat(amount);
          this.memberTotals[data.id] += parseFloat(amount);
          this.grandTotal += parseFloat(amount);
        } else {
          this.contributionTotal[contr.id] += 0;
          this.grandTotal += 0;
          this.memberTotals[data.id] += 0;
        }
      });
    });
  }


  async save() {
    const membersData = this.monthsDatas.map(i => {
      return {
        groupId: this.group.id,
        memberId: this.memberId,
        amountTaken: i.total,
        loans: {},
        fines: {},
        contributions: i.contributions,
        date: this.commonService.formatDate(i.date),
        year: i.year,
        month: i.month,
        period: `${i.year}${i.month}`,
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

  deleteEntry(id) {
    this.monthsDatas = this.monthsDatas.filter(i => i.id !== id);
    this.excludedPeriods = this.monthsDatas.map(i => i.period);
    this.calculateTotal();
  }

  setMember(value: any) {
    this.currentMember = this.members.find(i => i.id === value);
    this.memberContributions$ = this.store.pipe(select(paymentSelector.selectContributionOnlyByMember(value)));
  }

  onClose() {
    this.closeForm.emit();
  }

  setMonthAndYear($event: { month: {id: string, name: string}, year: any }) {
    const contributions = {};
    this.contributionTypes.forEach(contr => {
      if (contr.is_fixed && contr.is_must) {
        contributions[contr.id] = contr.fixed_value;
      }
    });
    this.monthsDatas.push({
      id: this.commonService.makeId(),
      year: $event.year,
      month: $event.month.id,
      period: `${$event.year}${$event.month.id}`,
      date: this.commonService.formatDate(new Date(`${$event.year}-${$event.month.id}-01`)),
      memberId: this.memberId,
      contributions,
      total: 0,
    });
    this.excludedPeriods = this.monthsDatas.map(i => i.period);
    this.calculateTotal();
  }

}
