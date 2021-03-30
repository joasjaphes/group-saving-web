import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../../store/group/group.model';
import {select, Store} from '@ngrx/store';
import * as groupSelector from '../../../store/group/group.selectors';
import * as memberSelector from '../../../store/member/member.selectors';
import * as paymentSelector from '../../../store/payment/payment.selectors';
import * as expenseSelector from '../../../store/expense/expense.selectors';
import * as loanSelector from '../../../store/loan/loan.selectors';
import {ApplicationState} from '../../../store';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import {Member} from '../../../store/member/member.model';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-collection-summary',
  templateUrl: './collection-summary.component.html',
  styleUrls: ['./collection-summary.component.scss'],
  animations: [fadeIn]
})
export class CollectionSummaryComponent implements OnInit {
  @Input() showTitle = true;
  @Input() member: Member;
  group$: Observable<Group>;
  contributionTypes$: Observable<ContributionType[]>;
  progress$: Observable<any>;
  memberName$: Observable<string>;
  totalIn$: Observable<number>;
  totalOut$: Observable<number>;
  totalLoanOut$: Observable<number>;
  totalContributions$: Observable<number>;
  totalContributionOnly$: Observable<number>;
  totalLoanReturns$: Observable<number>;
  totalFinesPaid$: Observable<number>;
  totalExpenses$: Observable<number>;
  currentContr = 'All';
  years$: Observable<string[]>;
  year: any = new Date().getFullYear();
  typeName = 'All';
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.progress$ = this.store.pipe(select(groupSelector.selectProgressPercent));
    this.memberName$ = this.store.pipe(select(memberSelector.selectFirstNameOnly));
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectRepeating));
    this.years$ = this.store.pipe(select(paymentSelector.selectYearsWithPayment));
  }

  ngOnInit(): void {
    this.year = this.member ? 'All' : this.year;
    this.getData();
  }

  setYear(year: any) {
    this.year = year;
    this.getData();
  }

  getData() {
    const memberId = this.member ? this.member.id : 'All';
    this.totalContributions$ = this.store.pipe(select(paymentSelector.selectTotalContributions(this.year, this.currentContr, memberId)));
    this.totalContributionOnly$ = this.store.pipe(select(paymentSelector.selectTotalPaymentByYear(this.year, this.currentContr, memberId)));
    this.totalLoanReturns$ = this.store.pipe(select(paymentSelector.selectTotalLoanPaymentByYear(this.year, this.currentContr, memberId)));
    this.totalFinesPaid$ = this.store.pipe(select(paymentSelector.selectTotalFinePaymentByYear(this.year, this.currentContr, memberId)));
    this.totalExpenses$ = this.store.pipe(select(expenseSelector.selectTotalByYear(this.year, this.currentContr, memberId)));
    this.totalLoanOut$ = this.store.pipe(select(loanSelector.selectTotalByYear(this.year, this.currentContr, memberId)));
    this.totalIn$ = this.store.pipe(select(paymentSelector.selectTotalIn(this.year, this.currentContr, memberId)));
    this.totalOut$ = this.store.pipe(select(paymentSelector.selectTotalByYear(this.year, this.currentContr, memberId)));
  }
}
