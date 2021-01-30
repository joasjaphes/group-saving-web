import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Observable} from 'rxjs';
import {Group} from '../../store/group/group.model';
import * as groupSelector from '../../store/group/group.selectors';
import * as memberSelector from '../../store/member/member.selectors';
import {ContributionType} from '../../store/contribution-type/contribution-type.model';
import {selectNeedBalance} from '../../store/group/group.selectors';
import {GroupProgress} from '../../store/group/group-progress.model';
import * as paymentSelector from '../../store/payment/payment.selectors';
import * as expenseSelector from '../../store/expense/expense.selectors';
import * as loanSelector from '../../store/loan/loan.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  group$: Observable<Group>;
  progress$: Observable<any>;
  progressDetails$: Observable<GroupProgress>;
  memberName$: Observable<string>;
  contributionTypeNeedBalance$: Observable<ContributionType[]>;
  totalIn$: Observable<number>;
  totalOut$: Observable<number>;
  totalLoanOut$: Observable<number>;
  totalContributions$: Observable<number>;
  totalContributionOnly$: Observable<number>;
  totalLoanReturns$: Observable<number>;
  totalFinesPaid$: Observable<number>;
  totalExpenses$: Observable<number>;
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.progress$ = this.store.pipe(select(groupSelector.selectProgressPercent));
    this.progressDetails$ = this.store.pipe(select(groupSelector.selectProgress));
    this.memberName$ = this.store.pipe(select(memberSelector.selectFirstNameOnly));
    this.contributionTypeNeedBalance$ = this.store.pipe(select(selectNeedBalance));

    this.totalContributions$ = this.store.pipe(select(paymentSelector.selectTotalContributions(2020)));
    this.totalContributionOnly$ = this.store.pipe(select(paymentSelector.selectTotalPaymentByYear(2020)));
    this.totalLoanReturns$ = this.store.pipe(select(paymentSelector.selectTotalLoanPaymentByYear(2021)));
    this.totalFinesPaid$ = this.store.pipe(select(paymentSelector.selectTotalFinePaymentByYear(2021)));
    this.totalExpenses$ = this.store.pipe(select(expenseSelector.selectTotalByYear(2021)));
    this.totalLoanOut$ = this.store.pipe(select(loanSelector.selectTotalByYear(2021)));
    this.totalIn$ = this.store.pipe(select(paymentSelector.selectTotalIn(2021)));
    this.totalOut$ = this.store.pipe(select(loanSelector.selectTotalByYear(2021)));
  }

  ngOnInit(): void {
  }

}
