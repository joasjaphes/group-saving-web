import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as paymentSelector from '../../../store/payment/payment.selectors';
import {ApplicationState} from '../../../store';
import {Group} from '../../../store/group/group.model';
import {Member} from '../../../store/member/member.model';
import * as expenseSelector from '../../../store/expense/expense.selectors';
import * as fineTypeSelector from '../../../store/fine-type/fine-type.selectors';
import {FineType} from '../../../store/fine-type/fine-type.model';

@Component({
  selector: 'app-other-summary',
  templateUrl: './other-summary.component.html',
  styleUrls: ['./other-summary.component.scss']
})
export class OtherSummaryComponent implements OnInit {

  years$: Observable<string[]>;
  @Input() group: Group;
  year: any = new Date().getFullYear();
  fineYear: any = new Date().getFullYear();
  @Input() member: Member;
  totalFinesPaid$: Observable<number>;
  totalExpenses$: Observable<number>;
  fineTypes$: Observable<FineType[]>;
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.years$ = this.store.pipe(select(paymentSelector.selectYearsWithPayment));
    this.fineTypes$ = this.store.pipe(select(fineTypeSelector.selectAll));
  }

  ngOnInit(): void {
    this.getData('All');
  }

  setYear(year: string) {
    this.year = year;
    this.getData('expense');
  }

  setFineYear(year: string) {
    this.fineYear = year;
    this.getData('fines');
  }

  getData(type) {
    const memberId = this.member ? this.member.id : 'All';
    if (type === 'expense') {
      this.totalExpenses$ = this.store.pipe(select(expenseSelector.selectTotalByYear(this.year, 'All', memberId)));
    }
    else if (type === 'fines') {
      this.totalFinesPaid$ = this.store.pipe(select(paymentSelector.selectTotalFinePaymentByYear(this.fineYear, 'All', memberId)));
    }
    else {
      this.totalFinesPaid$ = this.store.pipe(select(paymentSelector.selectTotalFinePaymentByYear(this.fineYear, 'All', memberId)));
      this.totalExpenses$ = this.store.pipe(select(expenseSelector.selectTotalByYear(this.year, 'All', memberId)));
    }
  }
}
