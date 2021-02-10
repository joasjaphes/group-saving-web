import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Observable} from 'rxjs';
import {Payment} from '../../../store/payment/payment.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import * as paymentSelector from '../../../store/payment/payment.selectors';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import {selectLoanByMember} from '../../../store/loan/loan.selectors';
import {paymentItemsFeatureKey} from '../../../store/payment-item/payment-item.reducer';
import {Member} from '../../../store/member/member.model';
import {Group} from '../../../store/group/group.model';
import * as memberSelector from '../../../store/member/member.selectors';
import * as groupSelector from '../../../store/group/group.selectors';

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss']
})
export class ContributionsComponent implements OnInit {
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  members$: Observable<Member[]>;
  group$: Observable<Group>;
  contributions$: Observable<any[]>;
  contributionTypes$: Observable<{name: string, total: number}[]>;
  currentView = 'members';
  year = new Date().getFullYear();
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
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

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  setYear(year: number) {
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
}
