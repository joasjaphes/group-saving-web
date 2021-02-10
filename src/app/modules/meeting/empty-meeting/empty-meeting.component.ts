import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-empty-meeting',
  templateUrl: './empty-meeting.component.html',
  styleUrls: ['./empty-meeting.component.scss']
})
export class EmptyMeetingComponent implements OnInit {

  @Output() setMeeting = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  setMeet() {
    this.setMeeting.next();
  }

}
