import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Observable} from 'rxjs';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import {LoanType} from '../../../store/loan-type/loan-type.model';
import * as memberSelector from '../../../store/member/member.selectors';
import * as groupSelector from '../../../store/group/group.selectors';
import * as loanTypeSelector from '../../../store/loan-type/loan-type.selectors';
import * as loanSelector from '../../../store/loan/loan.selectors';
import {Loan} from '../../../store/loan/loan.model';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  members$: Observable<Member[]>;
  group$: Observable<Group>;
  loanTypes$: Observable<LoanType[]>;
  loans$: Observable<Loan[]>;
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.loans$ = this.store.pipe(select(loanSelector.selectDetailed));
    this.loanTypes$ = this.store.pipe(select(loanTypeSelector.selectAll));
  }

  ngOnInit(): void {
  }

}
