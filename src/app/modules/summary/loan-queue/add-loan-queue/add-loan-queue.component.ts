import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {Member} from '../../../../store/member/member.model';
import {LoanType} from '../../../../store/loan-type/loan-type.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {LoanQueue} from '../../../../store/loan-queue/loan-queue.model';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';

@Component({
  selector: 'app-add-loan-queue',
  templateUrl: './add-loan-queue.component.html',
  styleUrls: ['./add-loan-queue.component.scss'],
  animations: [fadeIn]
})
export class AddLoanQueueComponent implements OnInit {
  @Input() group: Group;
  @Input() members: Member[];
  @Input() loanTypes: LoanType[];
  @Input() contributionTypes: ContributionType[];
  @Input() currentLoanQueue: LoanQueue;
  @Output() closeForm = new EventEmitter();

  loanTypeId: string;
  year = new Date().getFullYear();
  month: any;
  loanAmount: any;
  dateToTake: any;
  memberId: string;
  memberName: any;
  currentLoanType: LoanType;
  loading = false;
  memberSearch = '';

  years = [];
  maximumAmount: any;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
    if (this.loanTypes && this.loanTypes.length === 1) {
      this.loanTypeId = this.loanTypes[0].id;
    }
    this.generateYears();
  }

  generateYears() {
    this.years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear + i);
    }
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      memberId: this.memberId,
      amount: this.loanAmount,
      loanTypeId: this.loanTypeId,
      date: this.commonService.formatDate(this.dateToTake),
      year: this.year,
      month: this.month,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('createLoanQueue', dataToSave);
      this.loading = false;
      this.commonService.showSuccess(this.memberName + ' added to loan queue Successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      this.commonService.showError(this.memberName + ' was not added to loan queue successful');
      console.error(e);
    }
  }

  selectLoanType(value: string) {
    this.currentLoanType = this.loanTypes.find(i => i.id === value);
    const contributionType = this.contributionTypes.find(i => i.id === this.currentLoanType.contribution_type_id);
    let balance = 0;
    let loanMaximum = 0;
    if (this.currentLoanType.max_amount_type === 'Fixed') {
      loanMaximum = this.currentLoanType.maximum_amount;
    }
    if (contributionType) {
      if (contributionType.track_balance && this.group.contribution_balances) {
        balance = this.group.contribution_balances[contributionType.id];
      }
    }
    this.maximumAmount = balance < loanMaximum ? balance : loanMaximum;
  }

  selectMember(value: any) {
    const memberDetails = this.members.find(i => i.id === value);
    if (memberDetails) {
      this.memberName = memberDetails.name;
    }
  }

  closeDialog() {
    this.closeForm.emit();
  }

  selectMonth(value: any) {
    this.dateToTake = new Date(`${this.year}-${this.month}-01`);
  }

  setLoanPeriod($event: { month: { name: string; id: string }; year: any }) {
    this.dateToTake = new Date(`${$event.year}-${$event.month.id}-01`);
  }
}
