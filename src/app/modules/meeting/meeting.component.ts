import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../../store/member/member.model';
import {Group} from '../../store/group/group.model';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import * as memberSelector from '../../store/member/member.selectors';
import * as groupSelector from '../../store/group/group.selectors';
import * as meetingSelector from '../../store/meeting/meeting.selectors';
import {Meeting} from '../../store/meeting/meeting.model';
import {ContributionType} from '../../store/contribution-type/contribution-type.model';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  animations: [fadeIn]
})
export class MeetingComponent implements OnInit {
  members$: Observable<Member[]>;
  group$: Observable<Group>;
  nextMeeting$: Observable<{
    meeting_date: any;
    meeting_place: string;
  }>;
  meetings$: Observable<Meeting[]>;
  currentMeeting: Meeting;
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.members$ = this.store.pipe(select(memberSelector.selectAll));
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.nextMeeting$ = this.store.pipe(select(groupSelector.nextMeeting));
    this.meetings$ = this.store.pipe(select(meetingSelector.selectAll));
  }

  ngOnInit(): void {
  }

  addItem() {
    this.viewDetails = true;
    this.panelTitle = 'Set Meeting';
    this.viewType = 'add';
  }

  closePanel() {
    this.currentMeeting = null;
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  edit(contr: Meeting) {
    this.currentMeeting = contr;
    this.viewDetails = true;
    this.panelTitle = 'Update next meeting';
    this.viewType = 'add';
  }

  completeMeeting() {
    this.viewDetails = true;
    this.panelTitle = 'Complete meeting';
    this.viewType = 'complete';
  }

  cancelMeeting() {
    this.viewDetails = true;
    this.panelTitle = 'Complete meeting';
    this.viewType = 'cancel';
  }

}
