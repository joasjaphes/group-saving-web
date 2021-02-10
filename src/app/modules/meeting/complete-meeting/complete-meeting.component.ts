import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Meeting} from '../../../store/meeting/meeting.model';
import {Member} from '../../../store/member/member.model';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-complete-meeting',
  templateUrl: './complete-meeting.component.html',
  styleUrls: ['./complete-meeting.component.scss'],
  animations: [fadeIn]
})
export class CompleteMeetingComponent implements OnInit {
  @Input() group: Group;
  @Input() currentMeeting: Meeting;
  @Input() members: Member[];
  @Output() closeForm = new EventEmitter();
  meetingDate: any;
  meetingPlace: any;
  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
    if (this.group && this.group.next_meeting) {
      this.meetingDate = this.group.next_meeting.meeting_date;
      this.meetingPlace = this.group.next_meeting.meeting_place;
    }
  }

  onClose() {
    this.closeForm.emit();
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      meetingDate: this.commonService.formatDate(this.meetingDate),
      meetingPlace: this.meetingPlace
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('setNextMeeting', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Next meeting information Submitted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Next meeting was not assigned successful');
      console.error(e);
    }
  }
}
