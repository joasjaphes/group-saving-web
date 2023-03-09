import {Component, Input, OnInit} from '@angular/core';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import * as paymentSelector from '../../../store/payment/payment.selectors';
import * as expenseSelector from '../../../store/expense/expense.selectors';
import {Go} from '../../../store/router/router.action';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.scss']
})
export class ExpenseSummaryComponent implements OnInit {
  @Input() showTitle = true;
  @Input() member: Member;
  @Input() group: Group;
  group$: Observable<Group>;
  years$: Observable<string[]>;
  totalExpenses$: Observable<number>;
  year: any = new Date().getFullYear();
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.years$ = this.store.pipe(select(paymentSelector.selectYearsWithPayment));
  }

  ngOnInit(): void {
    this.year = this.member ? 'All' : this.year;
    this.getData();
  }

  getData() {
    const memberId = this.member ? this.member.id : 'All';
    this.totalExpenses$ = this.store.pipe(select(expenseSelector.selectTotalByYear(this.year, 'All', memberId)));
  }

  setYear(year: any) {
    this.year = year;
    this.getData();
  }

  goToExpense() {
    this.store.dispatch(new Go({path: ['', 'summary', 'expenses', this.year ]}));
  }

}
