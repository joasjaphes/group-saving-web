import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../../store/member/member.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import * as memberSelector from '../../store/member/member.selectors';
import * as groupSelector from '../../store/group/group.selectors';
import {Group} from '../../store/group/group.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members$: Observable<Member[]>;
  group$: Observable<Group>;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
  }

  ngOnInit(): void {
  }

}
