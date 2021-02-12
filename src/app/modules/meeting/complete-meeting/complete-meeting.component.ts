import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Meeting} from '../../../store/meeting/meeting.model';
import {Member} from '../../../store/member/member.model';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';
import {fadeIn} from '../../../shared/animations/router-animation';
import {Observable} from 'rxjs';
import {Payment} from '../../../store/payment/payment.model';

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
  @Input() membersEntities: { [id: string]: Member };
  @Output() closeForm = new EventEmitter();
  meetingDate: any;
  meetingPlace: any;
  notes: any;
  loading = false;
  attendance = {};

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
      date: this.commonService.formatDate(this.meetingDate),
      place: this.meetingPlace,
      notes: this.notes,
      attendance: Object.keys(this.attendance)
        .filter(i => this.attendance[i])
        .map(i => ({
        member_id: i,
        member_name: this.membersEntities[i]?.name
      }))
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('completeMeeting', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Meeting information Submitted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Meeting was not assigned successful');
      console.error(e);
    }
  }

  selectMember(member: Member) {
    this.attendance[member.id] = !this.attendance[member.id];
  }
}
