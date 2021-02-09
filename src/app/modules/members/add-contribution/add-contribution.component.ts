import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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

  contributionDate = new Date();
  contributionSelected: any = {};
  loanSelected: any = {};
  contributionAmount: any = {};
  loanAmount: any = {};
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
  month: string;
  paymentMode: string;
  referenceNumber: string;
  constructor(
    public dialogRef: MatDialogRef<AddContributionComponent>,
    private commonService: CommonService,
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>,
    @Inject(MAT_DIALOG_DATA) public data: {
      group: Group;
      contributionTypes: ContributionType[];
      fineTypes: FineType[];
      member: Member;
    }
  ) { }

  ngOnInit(): void {
    this.memberLoans$ = this.store.pipe(select(selectLoanByMember(this.data.member?.id)));
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
    const dataToSave = {
      groupId: this.data.group.id,
      memberId: this.data.member.id,
      amountTaken: this.loanAmount,
      loans: this.loanAmount,
      fines: this.fineAmounts,
      contributions: this.contributionAmount,
      date: this.commonService.formatDate(this.contributionDate),
      year: this.year,
      month: this.month,
      referenceNumber: this.referenceNumber,
      paymentMode: this.paymentMode,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('addNewContribution', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Contribution from ' + this.data.member.name + ' Submitted Successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Loan was not assigned successful');
      console.error(e);
    }
  }

  enableContribution(checked: boolean, contributionType: ContributionType) {
    if (checked && contributionType.is_must && contributionType.is_fixed) {
      this.contributionAmount[contributionType.id] = contributionType.fixed_value;
      this.findTotal();
    } else {
      this.contributionAmount[contributionType.id] = null;
      this.findTotal();
    }
  }

  enableLoanPayment(checked: boolean, loan: Loan) {
    const loanType = loan.loanType;
    if (checked && loanType.pay_same_amount_is_must) {
      this.loanAmount[loan.id] = loan.amount_per_return;
      this.findTotal();
    } else {
      this.loanAmount[loan.id] = null;
      this.findTotal();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  setHaveFines($event: MatCheckboxChange) {
    if (!$event.checked) {
      this.fineAmounts = {};
      this.finesToBePaid = [];
    }
  }
}
