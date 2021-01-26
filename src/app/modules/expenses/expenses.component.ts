import { Component, OnInit } from '@angular/core';
import {AssignLoanComponent} from '../members/assign-loan/assign-loan.component';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Member} from '../../store/member/member.model';
import {Group} from '../../store/group/group.model';
import {ContributionType} from '../../store/contribution-type/contribution-type.model';
import * as memberSelector from '../../store/member/member.selectors';
import * as groupSelector from '../../store/group/group.selectors';
import * as contributionTypeSelector from '../../store/contribution-type/contribution-type.selectors';
import {first} from 'rxjs/operators';
import {AddExpenseComponent} from './add-expense/add-expense.component';
import {Expense} from '../../store/expense/expense.model';
import * as expenseSelector from '../../store/expense/expense.selectors';

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
  constructor(
    private store: Store<ApplicationState>,
    public dialog: MatDialog,
  ) {
    this.expenses$ = this.store.pipe(select(expenseSelector.selectAll));
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectRepeating));
  }

  ngOnInit(): void {
  }

  async addExpense() {
    const group = await this.group$.pipe(first()).toPromise();
    const contributionTypes = await this.contributionTypes$.pipe(first()).toPromise();
    const members = await this.members$.pipe(first()).toPromise();
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '60%',
      minHeight: '60vh',
      data: {
        group,
        contributionTypes,
        members,
      },
      disableClose: true,
    });
  }

}
