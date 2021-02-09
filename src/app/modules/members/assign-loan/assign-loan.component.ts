import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {Member} from '../../../store/member/member.model';
import {LoanType} from '../../../store/loan-type/loan-type.model';
import {fadeIn} from '../../../shared/animations/router-animation';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';

@Component({
  selector: 'app-assign-loan',
  templateUrl: './assign-loan.component.html',
  styleUrls: ['./assign-loan.component.scss'],
  animations: [fadeIn]
})
export class AssignLoanComponent implements OnInit {
  @Input() group: Group;
  @Input() contributionTypes: ContributionType[];
  @Input() loanTypes: LoanType[];
  @Input() member: Member;

  @Output() closeForm = new EventEmitter();
  loanType: string;
  loanStartDate: any = new Date();
  currentLoanType: LoanType;
  loanAmount: any;
  duration: any;
  testToReturn: number;
  testAmountPerReturn: number;
  totalProfitContribution: number;
  insuranceAmount: number;
  newDate: any;
  loading = false;
  maximumAmount;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
    if (this.loanTypes && this.loanTypes.length === 1) {
      this.loanType = this.loanTypes[0].id;
      this.loanTypeSelected(this.loanType);
    }
  }

  loanTypeSelected(loanTypeId) {
    this.currentLoanType = this.loanTypes.find(i => i.id === loanTypeId);
    const contributionType = this.contributionTypes.find(i => i.id === this.currentLoanType.contribution_type_id);
    if (contributionType) {
      if (contributionType.track_balance && this.group.contribution_balances) {
        this.maximumAmount = this.group.contribution_balances[contributionType.id];
      }
    }
    this.calculateLoan();
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
        this.testToReturn = (parseInt(this.loanAmount, 10) + (this.loanAmount * (interestRate / 100)));
        this.testAmountPerReturn = this.testToReturn / this.duration;
      } else if (profitCalculationType  === 'Custom Formula') {
        // tslint:disable-next-line:no-eval
        const interest = eval(loanFormular.replace('M', this.loanAmount + '').replace('T', this.duration + ''));
        this.testToReturn = parseInt(this.loanAmount, 10) + parseInt(interest, 10);
        this.testAmountPerReturn = this.testToReturn / this.duration;
      } else {
        this.testAmountPerReturn = this.loanAmount * (interestRate / 100);
        this.testToReturn = (parseInt(this.loanAmount, 10) + (this.loanAmount * (interestRate / 100)));
      }

      if (this.currentLoanType.is_insured) {
        this.insuranceAmount = this.loanAmount * (parseFloat(this.currentLoanType.insurance_percent + '') / 100);
      }
      this.totalProfitContribution = this.testToReturn - this.loanAmount;

      if (this.currentLoanType.duration_type === 'Monthly') {
        const d = new Date(this.loanStartDate);
        d.setMonth(d.getMonth() + this.duration);
        this.newDate = d;
      }
      if (this.currentLoanType.duration_type === 'Weekly') {
        const d = new Date(this.loanStartDate);
        d.setMonth(d.getDate() + (this.duration * 7));
        this.newDate = d;
      } else {
        const d = new Date(this.loanStartDate);
        d.setMonth(d.getMonth() + this.duration);
        this.newDate = d;
      }
    }
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      loanUsed: this.loanType,
      memberId: this.member.id,
      amountTaken: this.loanAmount,
      duration: this.duration,
      return_amount: this.testToReturn,
      amount_per_return: this.testAmountPerReturn,
      date: this.commonService.formatDate(this.loanStartDate),
      end_date: this.commonService.formatDate(this.newDate),
      total_profit_contribution: this.totalProfitContribution,
      insurance_amount: this.insuranceAmount || 0
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('assignLoanToMember', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Loan assigned to ' + this.member.name + ' Successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Loan was not assigned successful');
      console.error(e);
    }
  }

  closeDialog() {
    this.closeForm.emit();
  }

  setAmountPerReturn() {

  }
}
