import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {FineType} from '../../../store/fine-type/fine-type.model';
import {LoanType} from '../../../store/loan-type/loan-type.model';
import {select, Store} from '@ngrx/store';
import * as memberSelector from '../../../store/member/member.selectors';
import * as groupSelector from '../../../store/group/group.selectors';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import * as fineTypeSelector from '../../../store/fine-type/fine-type.selectors';
import * as loanTypeSelector from '../../../store/loan-type/loan-type.selectors';
import {ApplicationState} from '../../../store';
import {Loan} from '../../../store/loan/loan.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-loan-types',
  templateUrl: './loan-types.component.html',
  styleUrls: ['./loan-types.component.scss']
})
export class LoanTypesComponent implements OnInit {
  members$: Observable<Member[]>;
  group$: Observable<Group>;
  contributionTypes$: Observable<ContributionType[]>;
  loanTypes$: Observable<LoanType[]>;
  fineTypes$: Observable<FineType[]>;
  currentLoanType: LoanType;
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectDetailed));
    this.fineTypes$ = this.store.pipe(select(fineTypeSelector.selectAll));
    this.loanTypes$ = this.store.pipe(select(loanTypeSelector.selectDetailed));
  }

  ngOnInit(): void {
  }

  addItem() {
    this.viewDetails = true;
    this.panelTitle = 'Add new loan type';
    this.viewType = 'add';
  }

  closePanel() {
    this.currentLoanType = null;
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  edit(contr: LoanType) {
    this.currentLoanType = contr;
    this.viewDetails = true;
    this.panelTitle = 'Update ' + contr.name;
    this.viewType = 'add';
  }

  delete(contr: LoanType) {
    console.log('deleting', contr);
  }

}
