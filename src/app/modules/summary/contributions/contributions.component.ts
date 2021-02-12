import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Observable} from 'rxjs';
import * as paymentSelector from '../../../store/payment/payment.selectors';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import * as memberSelector from '../../../store/member/member.selectors';
import * as groupSelector from '../../../store/group/group.selectors';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../../shared/animations/router-animation';
import {Payment} from '../../../store/payment/payment.model';
import { formatNumber } from '@angular/common';
@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss'],
  animations: [fadeIn],
})
export class ContributionsComponent implements OnInit {
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  members$: Observable<Member[]>;
  group$: Observable<Group>;
  contributions$: Observable<any[]>;
  contributionTypes$: Observable<{name: string, total: number, id: string}[]>;
  currentView = 'members';
  year = new Date().getFullYear();
  hover = {};
  currentPayments$: Observable<Payment[]>;
  years$: Observable<string[]>;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.years$ = this.store.pipe(select(paymentSelector.selectYearsWithPayment));
    // this.contributions$ = this.store.pipe(select(paymentSelector.selectDetailedGroupByMonth('2021')));
    this.contributions$ = this.store.pipe(select(paymentSelector.selectDetailedGroupByMember(this.year)));
    this.contributionTypes$ = this.store.pipe(select(paymentSelector.selectContributionTypeSummary(this.year)));
  }

  ngOnInit(): void {
  }

  addItem() {
    this.viewDetails = true;
    this.panelTitle = 'Add new expense';
    this.viewType = 'add';
  }

  viewMemberContributions(member) {
    this.currentPayments$ = this.store.pipe(select(paymentSelector.selectContributionByMemberByYear(this.year, member.id)));
    this.viewDetails = true;
    this.panelTitle = this.year + ' Contributions for ' + member.name;
    this.viewType = 'view';
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  setYear(year: any) {
    this.year = year;
    this.getData();
  }

  getData() {
    if (this.currentView === 'members') {
      this.contributions$ = this.store.pipe(select(paymentSelector.selectDetailedGroupByMember(this.year)));
    } else {
      this.contributions$ = this.store.pipe(select(paymentSelector.selectDetailedGroupByMonth(this.year)));
    }
    this.contributionTypes$ = this.store.pipe(select(paymentSelector.selectContributionTypeSummary(this.year)));
  }

  viewContributions(payment: any) {
    if (payment.type === 'member') {
      this.currentPayments$ = this.store.pipe(select(paymentSelector.selectContributionByMemberByYear(this.year, payment.id)));
      this.panelTitle = this.year + ' Contributions for ' + payment.name;
    } else {
      this.currentPayments$ = this.store.pipe(select(paymentSelector.selectContributionByMonthByYear(this.year, payment.key)));
      this.panelTitle = ' Contributions for ' + payment.name;
    }
    this.viewDetails = true;
    this.viewType = 'view';
  }

  viewByType(contr: {name: string; total: number, id: string}) {
    this.currentPayments$ = this.store.pipe(select(paymentSelector.selectContributionByTypeByYear(this.year, contr.id)));
    this.panelTitle = this.year + ' Contributions for ' + contr.name + ' (' + formatNumber(contr.total, 'en-US', '1.0-0') + ')';
    this.viewDetails = true;
    this.viewType = 'view';
  }
}
