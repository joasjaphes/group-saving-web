import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from '../../../../store/member/member.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Group} from '../../../../store/group/group.model';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';

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
  years = [];
  memberId;
  searchMembers;
  monthsDatas = [];
  memberAmounts = {};
  month;
  year;
  totals = {};
  contributionDate: any;
  grandTotal = 0;
  contributionTotal = {};
  loading: any;

  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) {
  }

  ngOnInit(): void {
    this.generateYears();
  }

  generateYears() {
    this.years = [];
    const currentYear = new Date().getFullYear();
    for (let i = -5; i < 10; i++) {
      this.years.push(currentYear + i);
    }
  }

  setNewMonth(event: any) {
    try {
      const contributions = {};
      this.contributionTypes.forEach(contr => {
        if (contr.is_fixed && contr.is_must) {
          contributions[contr.id] = contr.fixed_value;
        }
      });
      this.monthsDatas.push({
        id: this.commonService.makeid(),
        year: this.year,
        month: this.month,
        date: this.commonService.formatDate(new Date(`${this.year}-${this.month}-01`)),
        memberId: this.memberId,
        contributions,
        total: 0,
      });
      this.year = null;
      this.month = null;
      event.value = '';
      this.calculateTotal();
    } catch (e) {
      console.error(e);
    }

  }

  setDate() {
    const contributions = {};
    this.contributionTypes.forEach(contr => {
      if (contr.is_fixed && contr.is_must) {
        contributions[contr.id] = contr.fixed_value;
      }
    });
    this.monthsDatas.push({
      id: this.commonService.makeid(),
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
    this.contributionTypes.forEach(contr => {
      this.contributionTotal[contr.id] = 0;
      this.monthsDatas.forEach(data => {
        data.total = 0;
        const amount = data.contributions[contr.id] ? data.contributions[contr.id] + '' : '0';
        if (!!amount) {
          data.total += parseFloat(amount);
          this.contributionTotal[contr.id] += parseFloat(amount);
          this.grandTotal += parseFloat(amount);
        } else {
          data.total += 0;
          this.contributionTotal[contr.id] += 0;
          this.grandTotal += 0;
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
    this.calculateTotal();
  }

  setMember(value: any) {
    this.currentMember = this.members.find(i => i.id === value);
  }

  onClose() {
    this.closeForm.emit();
  }

}
