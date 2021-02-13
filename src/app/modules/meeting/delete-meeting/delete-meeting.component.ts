import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Meeting} from '../../../store/meeting/meeting.model';
import {Member} from '../../../store/member/member.model';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';

@Component({
  selector: 'app-delete-meeting',
  templateUrl: './delete-meeting.component.html',
  styleUrls: ['./delete-meeting.component.scss']
})
export class DeleteMeetingComponent implements OnInit {
  @Input() group: Group;
  @Input() currentMeeting: Meeting;
  @Input() members: Member[] = [];

  @Output() closeForm = new EventEmitter();
  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.closeForm.emit();
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      meetingId: this.currentMeeting.id,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('deleteMeeting', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Meeting information Removed Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Meeting information was not removed successful');
      console.error(e);
    }
  }

}
