import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Observable} from 'rxjs';
import {Group} from '../../../store/group/group.model';
import * as paymentSelector from '../../../store/payment/payment.selectors';
import * as groupSelector from '../../../store/group/group.selectors';
import {Member} from '../../../store/member/member.model';

@Component({
  selector: 'app-expected-collection',
  templateUrl: './expected-collection.component.html',
  styleUrls: ['./expected-collection.component.scss']
})
export class ExpectedCollectionComponent implements OnInit {
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  group$: Observable<Group>;
  years$: Observable<string[]>;
  year: any = new Date().getFullYear();
  contributionTypes$: Observable<{name: string, total: number, id: string}[]>;
  expected$: Observable<{amounts: {name: string; value: number; }[], total: number}>;
  expectedList$: Observable<{amounts: {name: string; value: number; }[], total: number, member: Member}[]>;
  months = [
    { id: '01', name: 'January'},
    { id: '02', name: 'February'},
    { id: '03', name: 'March'},
    { id: '04', name: 'April'},
    { id: '05', name: 'May'},
    { id: '06', name: 'June'},
    { id: '07', name: 'July'},
    { id: '08', name: 'August'},
    { id: '09', name: 'September'},
    { id: '10', name: 'October'},
    { id: '11', name: 'November'},
    { id: '12', name: 'December'},
  ];
  useMonth = [];
  month: any;
  period;
  monthName = '';
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.years$ = this.store.pipe(select(paymentSelector.selectYearsWithPayment));
  }

  ngOnInit(): void {
    this.getMonthAfterCurrentMont();
    this.getData();
  }

  addItem() {
    this.viewDetails = true;
    this.panelTitle = 'Add new expense';
    this.viewType = 'add';
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  getMonthAfterCurrentMont() {
    const today = new Date();
    const monthNum = today.getMonth() + 1;
    const monthKey = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
    this.month = this.months.find(i => i.id === monthKey);
    this.period = `${this.year}${this.month.id}`;
    this.useMonth = this.months.filter(i => i.id >= monthKey);
    const month = this.useMonth.find(i => i.id == this.month.id);
    this.monthName = month.name + ' ' + this.year;
  }

  getData() {
    this.expected$ = this.store.pipe(select(paymentSelector.selectExpectedCollection(this.period)));
    this.expectedList$ = this.store.pipe(select(paymentSelector.selectMembersExpectedCollection(this.period)));
  }

  setYear(year: any) {
    this.period = `${this.year}${year.id}`;
    this.month = year;
    const month = this.useMonth.find(i => i.id == year.id);
    this.monthName = month.name + ' ' + this.year;
    this.getData();
  }

}
