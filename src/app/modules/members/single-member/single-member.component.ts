import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../../../store/member/member.model';
import * as memberSelector from '../../../store/member/member.selectors';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Loan} from '../../../store/loan/loan.model';
import {selectLoanByMemberFromRoute} from '../../../store/loan/loan.selectors';
import {Group} from '../../../store/group/group.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../../shared/animations/router-animation';
import * as groupSelector from '../../../store/group/group.selectors';

@Component({
  selector: 'app-single-member',
  templateUrl: './single-member.component.html',
  styleUrls: ['./single-member.component.scss']
})
export class SingleMemberComponent implements OnInit {

  member$: Observable<Member>;
  group$: Observable<Group>;
  loans$: Observable<Loan[]>;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.member$ = this.store.pipe(select(memberSelector.selectMemberFromRoute));
    this.loans$ = this.store.pipe(select(selectLoanByMemberFromRoute));
  }

  ngOnInit(): void {
  }

}
