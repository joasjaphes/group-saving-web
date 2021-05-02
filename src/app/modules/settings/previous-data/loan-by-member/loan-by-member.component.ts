import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from '../../../../store/member/member.model';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {Group} from '../../../../store/group/group.model';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {LoanType} from '../../../../store/loan-type/loan-type.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {Observable} from 'rxjs';
import {Loan} from '../../../../store/loan/loan.model';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import {selectLoanByMember} from '../../../../store/loan/loan.selectors';
import {MatSelectChange} from '@angular/material/select';

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
  returnedAmount: any = 0;
  lastReturnDate: any;
  loading: any;
  insuranceAmount = 0;
  amountPerReturn = 0;
  remainingBalance = 0;
  memberLoans$: Observable<Loan[]>;
  year = new Date().getFullYear();
  years = [];
  month: string;
  payments = [];
  recordByDate = false;
  paymentDate = null;
  loanId;
  excludedPeriods = [];
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>
  ) {
    this.memberLoans$ = this.store.pipe(select(selectLoanByMember(null)));
  }

  ngOnInit(): void {
    this.generateYears();
  }

  generateYears(year?: number) {
    this.years = [];
    const currentYear = year ? year : new Date().getFullYear();
    if (year) {
      for (let i = 0; i < 10; i++) {
        this.years.push(currentYear + i);
      }
    } else {
      for (let i = -5; i < 10; i++) {
        this.years.push(currentYear + i);
      }
    }
  }

  setMember(value: any) {
    this.currentMember = this.members.find(i => i.id === value);
    this.memberLoans$ = this.store.pipe(select(selectLoanByMember(value)));
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
      } else if (profitCalculationType === 'Custom Formula') {
        // tslint:disable-next-line:no-eval
        const interest = eval(loanFormular.replace('M', this.loanAmount + '').replace('T', this.duration + ''));
        this.returnAmount = parseInt(this.loanAmount, 10) + parseInt(interest, 10);
        this.amountPerReturn = this.returnAmount / this.duration;
      } else {
        this.returnAmount = (parseInt(this.loanAmount, 10) + (this.loanAmount * (interestRate / 100)));
      }
      this.setEndDate();
      if (this.currentLoanType.is_insured) {
        this.insuranceAmount = this.loanAmount * this.currentLoanType.insurance_percent / 100;
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
    this.year = new Date(this.contributionDate).getFullYear();
    this.generateYears(this.year);
  }

  async save() {
    const savedValues = {
      loanId: this.loanId ? this.loanId : this.commonService.makeId(),
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
      remaining_balance: this.payments.length === 0 ? this.returnAmount : this.remainingBalance,
      amount_returned: this.returnedAmount,
      last_return_date: this.commonService.formatDate(this.lastReturnDate),
      payments: this.payments
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

  calculateTotal() {
    let total = 0;
    let balance = this.returnAmount;
    for (const payment of this.payments) {
      const amount = payment.amount + '';
      if (!!amount) {
        total += parseFloat(amount);
        payment.previous_balance = balance;
        payment.new_balance = this.returnAmount - total;
        balance = this.returnAmount - total;
      }
    }
    this.returnedAmount = total;
    if (this.returnedAmount) {
      this.remainingBalance = this.returnAmount - this.returnedAmount;
    }
  }

  setDate() {
    let amount = null;
    if (this.currentLoanType.pay_same_amount_is_must) {
      amount = this.amountPerReturn;
    }
    const monthData = new Date(this.contributionDate).getMonth() + 1;
    // const date1 = new Date(this.contributionDate);
    // const oneJan =  new Date(date1.getFullYear(), 0, 1);
    // // @ts-ignore
    // const numberOfDays =  Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));
    // const weekNumber = Math.ceil(( date1.getDay() + 1 + numberOfDays) / 7);
    const year = new Date(this.contributionDate).getFullYear();
    const month = (monthData + '').length === 1 ? '0' + monthData : monthData + '';
    this.payments.push({
      id: this.commonService.makeId(),
      year,
      month,
      week: '',
      period: `${year}${month}`,
      date: this.commonService.formatDate(this.contributionDate),
      memberId: this.memberId,
      amount
    });
    this.paymentDate = null;
    this.preparePayments(this.payments);
    this.calculateTotal();
  }

  preparePayments(payments: any[]) {
    this.payments = payments.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else {
        return -1;
      }
    }).map(loan => {
      return {
        ...loan,
        previous_balance: 0,
        new_balance: 0,
      };
    });
  }

  deletePay(payment: any) {
    this.payments = this.payments.filter(i => i.id !== payment.id);
    this.excludedPeriods = this.payments.map(i => i.period);
    this.calculateTotal();
  }

  editLoan(loan: Loan) {
    this.setLoanType(loan.loan_used);
    this.loanId = loan.id;
    this.returnAmount = loan.total_amount_to_pay;
    this.loanTypeId = loan.loan_used;
    this.duration = loan.duration;
    this.endDate = loan.expected_date_of_payment;
    this.contributionDate = loan.date;
    this.returnedAmount = loan.amount_paid_to_date;
    this.loanAmount = loan.amount_taken;
    this.insuranceAmount = loan.insurance_amount;
    this.remainingBalance = loan.remaining_balance;

    this.payments = loan.payments.map(i => ({
      ...i
    }));
  }

  setMonthAndYear($event: any) {
    let amount = null;
    if (this.currentLoanType.pay_same_amount_is_must) {
      amount = this.amountPerReturn;
    }
    this.payments.push({
      id: this.commonService.makeId(),
      year: $event.year,
      month: $event.month.id,
      period: `${$event.year}${$event.month.id}`,
      week: '',
      date: this.commonService.formatDate(new Date(`${$event.year}-${$event.month.id}-01`)),
      memberId: this.memberId,
      amount
    });
    this.excludedPeriods = this.payments.map(i => i.period);
    this.preparePayments(this.payments);
    this.calculateTotal();
  }
}
