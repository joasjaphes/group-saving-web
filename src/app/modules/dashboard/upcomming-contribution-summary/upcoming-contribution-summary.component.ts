import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Member} from '../../../store/member/member.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import * as paymentSelector from '../../../store/payment/payment.selectors';

@Component({
  selector: 'app-upcoming-contribution-summary',
  templateUrl: './upcoming-contribution-summary.component.html',
  styleUrls: ['./upcoming-contribution-summary.component.scss']
})
export class UpcomingContributionSummaryComponent implements OnInit {
  @Input() group: Group;
  @Input() member: Member;
  group$: Observable<Group>;
  years$: Observable<string[]>;
  totalContributionOnly$: Observable<number>;
  year: any = new Date().getFullYear();
  contributionTypes$: Observable<{name: string, total: number, id: string}[]>;
  expected$: Observable<{amounts: {name: string; value: number; }[], total: number}>;
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
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.years$ = this.store.pipe(select(paymentSelector.selectYearsWithPayment));
  }

  ngOnInit(): void {
    this.year = this.member ? 'All' : this.year;
    this.getMonthAfterCurrentMont();
    this.getData();
  }

  getMonthAfterCurrentMont() {
    const today = new Date();
    const monthNum = today.getMonth() + 1;
    const monthKey = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
    this.month = this.months.find(i => i.id === monthKey);
    this.period = `${this.year}${this.month.id}`;
    this.useMonth = this.months.filter(i => i.id >= monthKey);
  }

  getData() {
    const memberId = this.member ? this.member.id : 'All';
    this.expected$ = this.store.pipe(select(paymentSelector.selectExpectedCollection(this.period)));
  }

  setYear(year: any) {
    this.period = `${this.year}${year.id}`;
    this.month = year;
    this.getData();
  }

}
