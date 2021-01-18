import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {Group} from '../../../../store/group/group.model';
import {GroupProgress} from '../../../../store/group/group-progress.model';
import {FunctionsService} from '../../../../services/functions.service';
import {CommonService} from '../../../../services/common.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import * as contributionSelector from '../../../../store/contribution-type/contribution-type.selectors';
import {Observable} from 'rxjs';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';

@Component({
  selector: 'app-starting-loan-type',
  templateUrl: './starting-loan-type.component.html',
  styleUrls: ['./starting-loan-type.component.scss'],
  animations: [fadeIn]
})
export class StartingLoanTypeComponent implements OnInit {
  @Input() group: Group;
  @Input() progressDetails: GroupProgress;

  @Output() closeForm = new EventEmitter();

  contributionTypes$: Observable<ContributionType[]>;
  contributionType: string;
  name: string;
  frequency: string;
  loading: any;
  minimumDuration: any;
  maximumDuration: any;
  minimumAmount: any;
  maximumAmountType: string;
  maximumAmount: any;
  maximumAmountBalanceFactor: any;
  profitCalculationType: string;
  paymentOption: string;
  interestRate: any;
  samePaymentPerReturn: string;
  loanFormular = '(M*(T+1)*1)/200';
  isLoanInsured: string;
  insurancePercent: any;
  fineForReturns: string;
  fineForReturnAmount: string;
  fineForReturnBalanceFactor: string;
  fineForReturnType: string;
  fineForCompletes: string;
  fineForCompleteAmount: string;
  fineForCompleteBalanceFactor: string;
  fineForCompleteType: string;

  testAmount: any;
  testDuration: any;
  testToReturn: any;
  testFirstInstallment: any;
  testAmountPerReturn: any;

  constructor(
    private functionsService: FunctionsService,
    private commonService: CommonService,
    private store: Store<ApplicationState>
  ) {
    this.contributionTypes$ = this.store.pipe(select(contributionSelector.selectedWithLoan));
  }

  ngOnInit(): void {
    if (this.progressDetails) {
      this.contributionType = this.progressDetails.currentContributionType;
      this.name = this.progressDetails.contributionName;
    }
    if (this.group) {
      this.frequency = this.group.meeting_settings ? this.group.meeting_settings.meeting_frequency : '';
    }
  }

  get durationTYpe() {
    switch (this.frequency) {
      case 'Monthly':
        return 'Months';
      case 'Weekly':
        return 'Weeks';
      case 'Yearly':
        return 'Years';
    }
  }

  calculateLoan() {
    if (this.testAmount !== '' && this.testDuration !== '') {
      if (this.profitCalculationType === 'Fixed Percent') {
        this.testToReturn = (parseInt(this.testAmount, 10) + (this.testAmount * (this.interestRate / 100)));
        this.testAmountPerReturn = this.testToReturn / this.testDuration;
      } else if (this.profitCalculationType  === 'Custom Formula') {
        // tslint:disable-next-line:no-eval
        const interest = eval(this.loanFormular.replace('M', this.testAmount + '').replace('T', this.testDuration + ''));
        this.testToReturn = parseInt(this.testAmount, 10) + parseInt(interest, 10);
        this.testAmountPerReturn = this.testToReturn / this.testDuration;
      } else {
        this.testAmountPerReturn = this.testAmount * (this.interestRate / 100);
        this.testToReturn = (parseInt(this.testAmount, 10) + (this.testAmount * (this.interestRate / 100)));
      }
    }
  }

  async sendData() {
    console.log('saving data');
  }
  close() {
    this.closeForm.emit();
  }

}
