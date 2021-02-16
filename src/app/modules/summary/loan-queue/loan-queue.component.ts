import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import {LoanType} from '../../../store/loan-type/loan-type.model';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import * as memberSelector from '../../../store/member/member.selectors';
import * as groupSelector from '../../../store/group/group.selectors';
import * as loanTypeSelector from '../../../store/loan-type/loan-type.selectors';
import * as loanQueueSelector from '../../../store/loan-queue/loan-queue.selectors';
import {LoanQueue} from '../../../store/loan-queue/loan-queue.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../../shared/animations/router-animation';
import {Loan} from '../../../store/loan/loan.model';
import {first} from 'rxjs/operators';
import * as loanSelector from '../../../store/loan/loan.selectors';

@Component({
  selector: 'app-loan-queue',
  templateUrl: './loan-queue.component.html',
  styleUrls: ['./loan-queue.component.scss']
})
export class LoanQueueComponent implements OnInit {
  members$: Observable<Member[]>;
  group$: Observable<Group>;
  loanTypes$: Observable<LoanType[]>;
  loanQueue$: Observable<LoanQueue[]>;
  contributionTypes$: Observable<ContributionType[]>;
  currentLoanQueue: LoanQueue;
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  currentMember: Member;
  membersLoans$: Observable<Loan[]>;
  initialDate: any;
  initialAmount: number;
  initialLoanType: string;
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.loanQueue$ = this.store.pipe(select(loanQueueSelector.selectDetailed));
    this.loanQueue$.subscribe(i => console.log({i}));
    this.loanTypes$ = this.store.pipe(select(loanTypeSelector.selectAll));
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectAll));
  }

  ngOnInit(): void {
  }

  addLoanType() {
    this.viewDetails = true;
    this.panelTitle = 'Add member to loan waiting list';
    this.viewType = 'add';
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
    this.initialAmount = null;
    this.initialDate = null;
    this.initialLoanType = '';
  }

  async addLoan(expense: LoanQueue) {
    this.currentMember = expense.member;
    this.viewDetails = true;
    this.panelTitle = 'Assign Loan to member';
    this.membersLoans$ = this.store.pipe(select(loanSelector.selectLoanByMember(expense.member_id)));
    this.initialAmount = expense.amount;
    this.initialDate = expense.date;
    this.initialLoanType = expense.loan_type_id;

    this.viewType = 'loan';
  }
}
