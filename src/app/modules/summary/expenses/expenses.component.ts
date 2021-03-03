import { Component, OnInit } from '@angular/core';
import {AssignLoanComponent} from '../../members/assign-loan/assign-loan.component';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import * as memberSelector from '../../../store/member/member.selectors';
import * as groupSelector from '../../../store/group/group.selectors';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import {Expense} from '../../../store/expense/expense.model';
import * as expenseSelector from '../../../store/expense/expense.selectors';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  members$: Observable<Member[]>;
  group$: Observable<Group>;
  contributionTypes$: Observable<ContributionType[]>;
  expenses$: Observable<Expense[]>;
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  currentExpense: Expense;
  constructor(
    private store: Store<ApplicationState>,
    public dialog: MatDialog,
  ) {
    this.expenses$ = this.store.pipe(select(expenseSelector.selectDetailed));
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectRepeating));
  }

  ngOnInit(): void {
  }

  addExpense() {
    this.viewDetails = true;
    this.panelTitle = 'Add new expense';
    this.viewType = 'add';
  }

  updateExpense(expense: Expense) {
    this.currentExpense = {...expense};
    this.viewDetails = true;
    this.panelTitle = 'Update expense';
    this.viewType = 'add';
  }

  deleteExpense(expense: Expense) {
    this.currentExpense = {...expense};
    this.viewDetails = true;
    this.panelTitle = 'Delete expense';
    this.viewType = 'delete';
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

}
