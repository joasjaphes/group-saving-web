import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-next-meeting',
  templateUrl: './next-meeting.component.html',
  styleUrls: ['./next-meeting.component.scss']
})
export class NextMeetingComponent implements OnInit {

  @Input() nextMeeting: {
    meeting_date: any;
    meeting_place: string;
  };

  @Output() completeMeeting = new EventEmitter();
  @Output() cancelMeeting = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onComplete() {
    this.completeMeeting.next();
  }

  onCancel() {
    this.cancelMeeting.next();
  }

}
