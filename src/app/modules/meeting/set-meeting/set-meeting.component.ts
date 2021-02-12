import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {Meeting} from '../../../store/meeting/meeting.model';
import {fadeIn} from '../../../shared/animations/router-animation';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';

@Component({
  selector: 'app-set-meeting',
  templateUrl: './set-meeting.component.html',
  styleUrls: ['./set-meeting.component.scss'],
  animations: [fadeIn]
})
export class SetMeetingComponent implements OnInit {

  @Input() group: Group;
  @Input() currentMeeting: Meeting;
  @Output() closeForm = new EventEmitter();
  today = new Date();
  meetingDate: any;
  meetingPlace: any;
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
