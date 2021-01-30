import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from '../../../../store/member/member.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Group} from '../../../../store/group/group.model';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {LoanType} from '../../../../store/loan-type/loan-type.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';

@Component({
  selector: 'app-loan-by-member',
  templateUrl: './loan-by-member.component.html',
  styleUrls: ['./loan-by-member.component.scss'],
  animations: [fadeIn]
})
export class LoanByMemberComponent implements OnInit {
  @Input() members: Member[];
  @Input() loanTypes: LoanType[];
  @Input() contributionTypes: ContributionType[];
  @Input() group: Group;
  @Output() closeForm = new EventEmitter();

  currentMember: Member;
  currentLoanType: LoanType;
  memberId;
  searchMembers;
  contributionDate: any;
  loanAmount;
  loanTypeId: any;
  returnAmount: any;
  duration: any;
  loanDuration: any;
  endDate: any;
  returnedAmount: any;
  lastReturnDate: any;
  loading: any;
  insuranceAmount = 0;
  amountPerReturn = 0;
  remainingBalance: any;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
  }

  setMember(value: any) {
    this.currentMember = this.members.find(i => i.id === value);
  }

  onClose() {
    this.closeForm.emit();
  }

  setLoanType(value: any) {
    this.currentLoanType = this.loanTypes.find(i => i.id === value);
  }

  get durationTYpe() {
    const frequency = this.currentLoanType ? this.currentLoanType.duration_type : '';
    switch (frequency) {
      case 'Monthly':
        return 'Months';
      case 'Weekly':
        return 'Weeks';
      case 'Yearly':
        return 'Years';
      default:
        return '';
    }
  }

  calculateLoan() {
    if (this.currentLoanType && !!this.loanAmount && !!this.duration) {
      const profitCalculationType = this.currentLoanType.profit_type;
      const interestRate = this.currentLoanType.interest_rate;
      const loanFormular = this.currentLoanType.loan_formular;
      if (profitCalculationType === 'Fixed Percent') {
        this.returnAmount = (parseInt(this.loanAmount, 10) + (this.loanAmount * (interestRate / 100)));
        this.amountPerReturn = this.returnAmount / this.duration;
      } else if (profitCalculationType  === 'Custom Formula') {
        // tslint:disable-next-line:no-eval
        const interest = eval(loanFormular.replace('M', this.loanAmount + '').replace('T', this.duration + ''));
        this.returnAmount = parseInt(this.loanAmount, 10) + parseInt(interest, 10);
        this.amountPerReturn = this.returnAmount / this.duration;
      } else {
        this.returnAmount = (parseInt(this.loanAmount, 10) + (this.loanAmount * (interestRate / 100)));
      }
      this.setEndDate();
      if (this.currentLoanType.is_insured) {
        this.insuranceAmount = this.loanAmount * this.currentLoanType.insurance_percent;
      }
    }
  }

  setEndDate() {
    if (this.currentLoanType.duration_type === 'Monthly') {
      const d = new Date(this.contributionDate);
      d.setMonth(d.getMonth() + this.duration);
      this.endDate = d;
    }
    if (this.currentLoanType.duration_type === 'Weekly') {
      const d = new Date(this.contributionDate);
      d.setMonth(d.getDate() + (this.duration * 7));
      this.endDate = d;
    } else {
      const d = new Date(this.contributionDate);
      d.setMonth(d.getMonth() + this.duration);
      this.endDate = d;
    }
  }

  async save() {
    const savedValues = {
      groupId: this.group.id,
      memberId: this.memberId,
      return_amount: this.returnAmount,
      loanUsed: this.loanTypeId,
      amountTaken: this.loanAmount,
      duration: this.duration,
      amount_per_return: this.amountPerReturn,
      date: this.commonService.formatDate(this.contributionDate),
      end_date: this.commonService.formatDate(this.endDate),
      total_profit_contribution: parseFloat(this.returnAmount + '') - parseFloat(this.loanAmount + ''),
      remaining_balance: this.remainingBalance,
      amount_returned: this.returnedAmount,
      last_return_date: this.commonService.formatDate(this.lastReturnDate)
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('assignPastActiveLoanToMember', savedValues);
      this.loading = false;
      this.commonService.showSuccess('Current Loan Submitted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Current Loan was not assigned successful');
      console.error(e);
    }
  }

  setReturnedAmount($event: any) {
    if ($event.target.value) {
      this.remainingBalance = this.returnAmount - this.returnedAmount;
    }
  }
}
