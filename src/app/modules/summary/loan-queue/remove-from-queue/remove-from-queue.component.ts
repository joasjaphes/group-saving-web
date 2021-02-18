import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {Member} from '../../../../store/member/member.model';
import {LoanType} from '../../../../store/loan-type/loan-type.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {LoanQueue} from '../../../../store/loan-queue/loan-queue.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {fadeIn} from '../../../../shared/animations/router-animation';

@Component({
  selector: 'app-remove-from-queue',
  templateUrl: './remove-from-queue.component.html',
  styleUrls: ['./remove-from-queue.component.scss'],
  animations: [fadeIn]
})
export class RemoveFromQueueComponent implements OnInit {
  @Input() group: Group;
  @Input() members: Member[];
  @Input() loanTypes: LoanType[];
  @Input() contributionTypes: ContributionType[];
  @Input() currentLoanQueue: LoanQueue;
  @Output() closeForm = new EventEmitter();

  loanTypeId: string;
  year: any = new Date().getFullYear();
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
    if (this.currentLoanQueue ) {
      this.memberId = this.currentLoanQueue.member_id;
      this.memberName = this.currentLoanQueue.member?.name;
      this.loanTypeId = this.currentLoanQueue.loan_type_id;
      this.loanAmount = this.currentLoanQueue.amount;
      this.year = this.currentLoanQueue.year;
      this.month = this.currentLoanQueue.month;
      this.dateToTake = this.currentLoanQueue.date;
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
      id: this.currentLoanQueue.id,
      groupId: this.group.id,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('removeMemberFromLoanQueue', dataToSave);
      this.loading = false;
      this.commonService.showSuccess(this.memberName + ' removed from loan queue Successful');
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
}
