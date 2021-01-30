import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from '../../../../store/member/member.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Group} from '../../../../store/group/group.model';
import {FineType} from '../../../../store/fine-type/fine-type.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {fadeIn} from '../../../../shared/animations/router-animation';

@Component({
  selector: 'app-fines-by-member',
  templateUrl: './fines-by-member.component.html',
  styleUrls: ['./fines-by-member.component.scss'],
  animations: [fadeIn]
})
export class FinesByMemberComponent implements OnInit {
  @Input() members: Member[];
  @Input() contributionTypes: ContributionType[];
  @Input() fineTypes: FineType[];
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


  deleteEntry(id) {
    this.monthsDatas = this.monthsDatas.filter(i => i.id !== id);
    this.calculateTotal();
  }

  calculateTotal() {
    this.grandTotal = 0;

    this.monthsDatas.forEach(data => {
      data.total = 0;
      this.fineTypes.forEach(contr => {
        const amount = data.fines[contr.id] ? data.fines[contr.id] + '' : '0';
        if (!!amount) {
          console.log(amount);
          data.total += parseFloat(amount);
          this.grandTotal += parseFloat(amount);
        } else {
          console.log({amount});
          data.total += 0;
          this.grandTotal += 0;
        }
      });
    });
  }

  setNewMonth(event: any) {
    try {
      const fines = {};
      this.monthsDatas.push({
        id: this.commonService.makeid(),
        year: this.year,
        month: this.month,
        date: this.commonService.formatDate(new Date(`${this.year}-${this.month}-01`)),
        memberId: this.memberId,
        fines,
        hasFine: {},
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
    const fines = {};
    // this.fineTypes.forEach(contr => {
    //   if (contr.calculation === 'Fixed') {
    //     fines[contr.id] = contr.fixed_amount;
    //   }
    // });
    this.monthsDatas.push({
      id: this.commonService.makeid(),
      year: '',
      month: '',
      memberId: this.memberId,
      date: this.contributionDate,
      fines,
      hasFine: {},
      total: 0,
    });
    this.contributionDate = '';
    this.calculateTotal();
  }

  async save() {
    const membersData = this.monthsDatas.map(i => {
      return {
        groupId: this.group.id,
        memberId: this.memberId,
        amountTaken: i.total,
        loans: {},
        fines: i.fines,
        contributions: {},
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
      this.commonService.showSuccess('Fines Submitted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Contributions was not assigned successful');
      console.error(e);
    }
  }

  setMember(value: any) {
    this.currentMember = this.members.find(i => i.id === value);
  }

  onClose() {
    this.closeForm.emit();
  }


  setFine(checked: boolean, contr: FineType, monthData: any) {
    if (checked) {
      if (contr.calculation === 'Fixed') {
        monthData.fines[contr.id] = contr.fixed_amount;
      }
    } else {
      monthData.fines[contr.id] = 0;
    }
    this.calculateTotal();
  }
}
