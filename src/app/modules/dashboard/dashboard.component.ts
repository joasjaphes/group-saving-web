import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import {Observable} from 'rxjs';
import {Group} from '../../store/group/group.model';
import * as groupSelector from '../../store/group/group.selectors';
import * as memberSelector from '../../store/member/member.selectors';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  group$: Observable<Group>;
  progress$: Observable<any>;
  memberName$: Observable<string>;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.progress$ = this.store.pipe(select(groupSelector.selectProgressPercent));
    this.memberName$ = this.store.pipe(select(memberSelector.selectFirstNameOnly));
  }

  ngOnInit(): void {
  }

}
