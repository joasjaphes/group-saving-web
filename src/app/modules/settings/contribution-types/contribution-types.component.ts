import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../../store/member/member.model';
import { Group } from '../../../store/group/group.model';
import { ContributionType } from '../../../store/contribution-type/contribution-type.model';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '../../../store';
import * as memberSelector from '../../../store/member/member.selectors';
import * as groupSelector from '../../../store/group/group.selectors';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import { FineType } from '../../../store/fine-type/fine-type.model';
import * as fineTypeSelector from '../../../store/fine-type/fine-type.selectors';
import * as fineSelector from '../../../store/fine/fine.selectors';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../shared/animations/router-animation';
import { Fine } from '../../../store/fine/fine.model';
import * as moment from 'moment';

@Component({
  selector: 'app-contribution-types',
  templateUrl: './contribution-types.component.html',
  styleUrls: ['./contribution-types.component.scss'],
})
export class ContributionTypesComponent implements OnInit {
  members$: Observable<Member[]>;
  group$: Observable<Group>;
  contributionTypes$: Observable<ContributionType[]>;
  fineTypes$: Observable<FineType[]>;
  fines$: Observable<Fine[]>;
  currentContributionType: ContributionType;
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(private store: Store<ApplicationState>) {
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.contributionTypes$ = this.store.pipe(
      select(contributionTypeSelector.selectDetailed)
    );
    this.fineTypes$ = this.store.pipe(select(fineTypeSelector.selectAll));
    this.fines$ = this.store.pipe(select(fineSelector.selectAll));
  }

  ngOnInit(): void {}

  get monthDays() {
    const days = [];
    const dateStart = moment();
    const dateEnd = moment().add(30, 'days');
    while (dateEnd.diff(dateStart, 'days') >= 0) {
      days.push(parseFloat(dateStart.format('D')));
      dateStart.add(1, 'days');
    }
    return days.sort((a, b) => (a > b ? 1 : -1));
  }

  addItem() {
    this.viewDetails = true;
    this.panelTitle = 'Add new contribution type';
    this.viewType = 'add';
  }

  closePanel() {
    this.currentContributionType = null;
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  edit(contr: ContributionType) {
    this.currentContributionType = contr;
    this.viewDetails = true;
    this.panelTitle = 'Update ' + contr.name;
    this.viewType = 'add';
  }

  delete(contr: ContributionType) {
    console.log('deleting', contr);
  }
}
