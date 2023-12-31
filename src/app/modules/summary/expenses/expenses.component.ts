import { Component, OnInit } from '@angular/core';
import { AssignLoanComponent } from '../../members/assign-loan/assign-loan.component';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '../../../store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Member } from '../../../store/member/member.model';
import { Group } from '../../../store/group/group.model';
import { ContributionType } from '../../../store/contribution-type/contribution-type.model';
import * as memberSelector from '../../../store/member/member.selectors';
import * as groupSelector from '../../../store/group/group.selectors';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import { Expense } from '../../../store/expense/expense.model';
import * as expenseSelector from '../../../store/expense/expense.selectors';
import { ActivatedRoute } from '@angular/router';
import { fadeIn } from 'src/app/shared/animations/router-animation';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  animations:[fadeIn]
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
  years$: Observable<string[]>;
  currentYear = new Date().getFullYear();
  currentView = 'group';
  memberSearch = '';
  constructor(
    private store: Store<ApplicationState>,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(param => {
      if(param?.year) {
        this.currentYear = param?.year;
      }
    })
    this.expenses$ = this.store.pipe(
      select(expenseSelector.selectGroupExpenseByYear(this.currentYear))
    );
    this.years$ = this.store.pipe(
      select(expenseSelector.selectYearsWithExpenses)
    );
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.contributionTypes$ = this.store.pipe(
      select(contributionTypeSelector.selectRepeating)
    );
  }

  ngOnInit(): void {}

  addExpense() {
    this.viewDetails = true;
    this.panelTitle = 'Add new expense';
    this.viewType = 'add';
  }

  updateExpense(expense: Expense) {
    this.currentExpense = { ...expense };
    this.viewDetails = true;
    this.panelTitle = 'Update expense';
    this.viewType = 'add';
  }

  deleteExpense(expense: Expense) {
    this.currentExpense = { ...expense };
    this.viewDetails = true;
    this.panelTitle = 'Delete expense';
    this.viewType = 'delete';
  }

  setYear(event) {
    this.currentYear = event;
    this.getData();
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  getData() {
    if (this.currentView === 'members') {
      this.expenses$ = this.store.pipe(
        select(expenseSelector.selectMembersExpenseByYear(this.currentYear))
      );
    } else {
      this.expenses$ = this.store.pipe(
        select(expenseSelector.selectGroupExpenseByYear(this.currentYear))
      );
    }
  }
}
