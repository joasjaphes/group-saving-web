import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Member} from '../../../store/member/member.model';
import {FineType} from '../../../store/fine-type/fine-type.model';
import * as fineSelector from '../../../store/fine-type/fine-type.selectors';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {fadeIn} from '../../../shared/animations/router-animation';
import {Observable} from 'rxjs';
import {Loan} from '../../../store/loan/loan.model';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {selectLoanByMember} from '../../../store/loan/loan.selectors';
import {MatSelectChange} from '@angular/material/select';
import {first} from 'rxjs/operators';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-add-contribution',
  templateUrl: './add-contribution.component.html',
  styleUrls: ['./add-contribution.component.scss'],
  animations: [fadeIn]
})
export class AddContributionComponent implements OnInit {

  @Input() group: Group;
  @Input() contributionTypes: ContributionType[];
  @Input() fineTypes: FineType[];
  @Input() member: Member;
  @Output() closeForm = new EventEmitter();
  contributionDate = new Date();
  contributionSelected: any = {};
  startingShareSelected: any = {};
  loanSelected: any = {};
  contributionAmount: any = {};
  loanAmount: any = {};
  baseLoanAmount: any = {};
  minLoanAmount: any = {};
  interestAmount: any = {};
  fineAmounts: any = {};
  memberLoans$: Observable<Loan[]>;
  fineTypes$: Observable<FineType[]>;
  finesToBePaid = [];
  selectedFineTypes: FineType[] = [];
  haveFines: any;
  total = 0;
  loading: any;
  year = new Date().getFullYear();
  years = [];
  period;
  month: string;
  paymentMode: string;
  referenceNumber: string;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>
  ) { }

  ngOnInit(): void {
    this.memberLoans$ = this.store.pipe(select(selectLoanByMember(this.member?.id)));
    this.fineTypes$ = this.store.pipe(select(fineSelector.selectAll));
    this.generateYears();
    // this.memberLoans$.subscribe(i => console.log(i));
  }

  generateYears() {
    this.years = [];
    const currentYear = new Date().getFullYear();
    for (let i = -5; i < 10; i++) {
      this.years.push(currentYear + i);
    }
  }

  getMonth() {
    const month = new Date().getMonth();
    const monthValue = month + 1;
    this.month = (monthValue + '').length === 1 ? '0' + monthValue : monthValue + '';
  }

  async setSelectedFines($event: MatSelectChange) {
    const fineTypes = await this.fineTypes$.pipe(first()).toPromise();
    this.selectedFineTypes = $event.value.map(i => fineTypes.find(k => k.id === i));
    this.fineAmounts = {};
    this.selectedFineTypes.forEach(fineType => {
      if (fineType.calculation === 'Fixed') {
        this.fineAmounts[fineType.id] = fineType.fixed_amount;
        this.findTotal();
      }
    });
  }

  findTotal() {
    let sum = 0;
    Object.keys(this.contributionAmount).forEach(item => {
      const val = this.contributionAmount[item];
      if (val) {
        sum += parseFloat(val);
      }
    });
    Object.keys(this.loanAmount).forEach(item => {
      const val = this.loanAmount[item];
      if (val) {
        sum += parseFloat(val);
      }
    });
    Object.keys(this.fineAmounts).forEach(item => {
      const val = this.fineAmounts[item];
      if (val) {
        sum += parseFloat(val);
      }
    });
    this.total = sum;
  }

  async save() {
    // Making sure that I am not sending empty or zeros to the server to cause issues
    this.fineAmounts = Object.keys(this.fineAmounts).reduce((object: any, key: string) => {
      if (!!this.fineAmounts[key]) {
        object[key] = this.fineAmounts[key];
      }
      return object;
    }, {});
    this.loanAmount = Object.keys(this.loanAmount).reduce((object: any, key: string) => {
      if (!!this.loanAmount[key]) {
        object[key] = this.loanAmount[key];
      }
      return object;
    }, {});
    this.contributionAmount = Object.keys(this.contributionAmount).reduce((object: any, key: string) => {
      if (!!this.contributionAmount[key]) {
        object[key] = this.contributionAmount[key];
      }
      return object;
    }, {});

    // Preparing Values to save
    let dataToSave = {
      groupId: this.group.id,
      memberName: this.member.name,
      groupName: this.group.group_name,
      memberId: this.member.id,
      amountTaken: this.loanAmount,
      loans: this.loanAmount,
      interestRate: this.interestAmount,
      baseAmount: this.baseLoanAmount,
      fines: this.fineAmounts,
      contributions: this.contributionAmount,
      startingAmount: {},
      date: this.commonService.formatDate(this.contributionDate),
      year: this.year,
      month: this.month,
      period: this.period ?? `${this.year}${this.month}`,
      referenceNumber: this.referenceNumber,
      paymentMode: this.paymentMode,
    };

    // Check to see if the current value is the starting share and add its value
    Object.keys(this.startingShareSelected).forEach(key => {
      if(this.startingShareSelected[key]) {
        dataToSave = {
          ...dataToSave,
          startingAmount: {[key]: this.contributionAmount[key]}
        }
      }
    });
    this.loading = true;
    try {
      await this.functionsService.saveData('addNewContribution', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Contribution from ' + this.member.name + ' Submitted Successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Contribution was not assigned successful');
      console.error(e);
    }
  }

  enableContribution(checked: boolean, contributionType: ContributionType) {
    if (checked && contributionType.is_must && contributionType.is_fixed) {
      this.contributionAmount[contributionType.id] = contributionType.fixed_value;
      this.findTotal();
    } else {
      this.contributionAmount = Object.keys(this.contributionAmount).reduce((object: any, key: string) => {
        if (key !== contributionType.id) {
          object[key] = this.contributionAmount[key];
        }
        return object;
      }, {});
      this.findTotal();
    }
  }

  findTotalAmount(loan: Loan) {
    if (this.baseLoanAmount[loan.id] && this.interestAmount[loan.id]) {
      this.loanAmount[loan.id] = this.baseLoanAmount[loan.id] + this.interestAmount[loan.id];
    }
    this.findTotal();
  }

  findBaseAmount(loan: Loan) {
    const loanType = loan.loanType;
    if (loanType.profit_type === 'Reducing Balance' && this.loanAmount[loan.id] && this.interestAmount[loan.id]) {
      this.baseLoanAmount[loan.id] = this.loanAmount[loan.id] - this.interestAmount[loan.id];
    }
    this.findTotal();
  }

  enableLoanPayment(checked: boolean, loan: Loan) {
    const loanType = loan.loanType;
    if (checked) {
      if (loanType.profit_type === 'Reducing Balance') {
        this.interestAmount[loan.id] = Math.ceil((loanType.interest_rate / 100) * loan.remaining_balance);
        if (loanType.minimum_amount_for_reducing_required && loanType.minimum_amount_for_reducing_percent) {
          this.baseLoanAmount[loan.id] = Math.ceil(loan.remaining_balance * (loanType.minimum_amount_for_reducing_percent / 100));
          this.minLoanAmount[loan.id] = Math.ceil(loan.remaining_balance * (loanType.minimum_amount_for_reducing_percent / 100));
        }
        this.findTotalAmount(loan);
      } else {
        if (loanType.pay_same_amount_is_must) {
          this.loanAmount[loan.id] = loan.amount_per_return;
          this.findTotal();
        } else {
          this.loanAmount = Object.keys(this.loanAmount).reduce((object: any, key: string) => {
            if (key !== loan.id) {
              object[key] = this.loanAmount[key];
            }
            return object;
          }, {});
          this.findTotal();
        }
      }
    }
  }

  closeDialog() {
    this.closeForm.emit();
  }

  setHaveFines($event: MatCheckboxChange) {
    if (!$event.checked) {
      this.fineAmounts = {};
      this.finesToBePaid = [];
    }
  }

  setPeriod($event: { month: { name: string; id: string }; year: any }) {
    this.year = $event.year;
    this.month = $event.month.id;
    this.period = `${$event.year}${$event.month.id}`;
  }
}
