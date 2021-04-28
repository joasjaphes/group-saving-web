import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Meeting} from '../../../store/meeting/meeting.model';
import {Member} from '../../../store/member/member.model';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.scss'],
  animations: [fadeIn]
})
export class ViewMeetingComponent implements OnInit {

  @Input() group: Group;
  @Input() currentMeeting: Meeting;
  @Input() members: Member[] = [];

  attendance = {};

  @Output() closeForm = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    if (this.currentMeeting) {
      this.currentMeeting.attendance.forEach(item => {
        this.attendance[item] = true;
      });
    }
  }

  onClose() {
    this.closeForm.emit();
  }

}
