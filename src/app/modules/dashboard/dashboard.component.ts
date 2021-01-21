import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Observable} from 'rxjs';
import {Group} from '../../store/group/group.model';
import * as groupSelector from '../../store/group/group.selectors';
import * as memberSelector from '../../store/member/member.selectors';
import {ContributionType} from '../../store/contribution-type/contribution-type.model';
import {selectNeedBalance} from '../../store/group/group.selectors';
import {GroupProgress} from '../../store/group/group-progress.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  group$: Observable<Group>;
  progress$: Observable<any>;
  progressDetails$: Observable<GroupProgress>;
  memberName$: Observable<string>;
  contributionTypeNeedBalance$: Observable<ContributionType[]>;

  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.progress$ = this.store.pipe(select(groupSelector.selectProgressPercent));
    this.progressDetails$ = this.store.pipe(select(groupSelector.selectProgress));
    this.memberName$ = this.store.pipe(select(memberSelector.selectFirstNameOnly));
    this.contributionTypeNeedBalance$ = this.store.pipe(select(selectNeedBalance));
  }

  ngOnInit(): void {
  }

}
