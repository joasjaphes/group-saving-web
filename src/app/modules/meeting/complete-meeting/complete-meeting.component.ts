import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group } from '../../../store/group/group.model';
import { Meeting } from '../../../store/meeting/meeting.model';
import { Member } from '../../../store/member/member.model';
import { CommonService } from '../../../services/common.service';
import { FunctionsService } from '../../../services/functions.service';
import { fadeIn } from '../../../shared/animations/router-animation';
import { Observable } from 'rxjs';
import { Payment } from '../../../store/payment/payment.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { getMonth } from 'functions/src/helpers';

@Component({
  selector: 'app-complete-meeting',
  templateUrl: './complete-meeting.component.html',
  styleUrls: ['./complete-meeting.component.scss'],
  animations: [fadeIn],
})
export class CompleteMeetingComponent implements OnInit {
  @Input() group: Group;
  @Input() currentMeeting: Meeting;
  @Input() members: Member[];
  @Input() editing = false;
  @Input() membersEntities: { [id: string]: Member };
  @Output() closeForm = new EventEmitter();
  meetingDate: any;
  meetingPlace: any;
  notes: any;
  loading = false;
  attendance = {};
  allSelected = false;

  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService
  ) {}

  ngOnInit(): void {
    console.log('group', this.group);
    if (this.editing && this.currentMeeting) {
      this.meetingDate = this.currentMeeting.date;
      this.meetingPlace = this.currentMeeting.place;
      this.notes = this.currentMeeting.notes;
      this.currentMeeting.attendance.forEach((item) => {
        this.attendance[item] = true;
      });
    } else {
      if (this.group && this.group.next_meeting) {
        this.meetingDate = this.group.next_meeting.meeting_date;
        this.meetingPlace = this.group.next_meeting.meeting_place;
      }
    }
  }

  onClose() {
    this.closeForm.emit();
  }

  get getMonth() {
    let month = new Date(this.meetingDate).getMonth() + 1 + '';
    if (month.length < 2) {
      month = `0${month}`;
    }
    return month;
  }

  async save() {
    const dataToSave = {
      id: this.currentMeeting
        ? this.currentMeeting.id
        : this.commonService.makeId(),
      groupId: this.group.id,
      groupName: this.group.group_name,
      date: this.commonService.formatDate(this.meetingDate),
      place: this.meetingPlace,
      notes: this.notes,
      attendance: Object.keys(this.attendance).filter(
        (i) => !!this.attendance[i]
      ),
      missed: Object.keys(this.attendance).filter((i) => !this.attendance[i]),
    };
    this.loading = true;
    try {
      if (this.editing) {
        await this.functionsService.saveData('updateMeeting', dataToSave);
      } else {
        let membersFines = [];
        if (dataToSave?.missed?.length) {
          for (const id of dataToSave.missed) {
            const year = new Date(this.meetingDate).getFullYear();
            const month = this.getMonth;
            const fineForNotAttending = this.setFinesForNotAttending();
            let fine = {
              groupId: this.group.id,
              memberId: id,
              fineAmounts: {
                [fineForNotAttending.id]: fineForNotAttending?.fixed_amount,
              },
              date: `${this.meetingDate}`,
              year,
              month,
              period: `${year}${month}`,
            };
            membersFines.push(fine);
          }
          dataToSave['membersFines'] = membersFines;
        }
        await this.functionsService.saveData('completeMeeting', dataToSave);
      }
      this.loading = false;
      this.commonService.showSuccess(
        'Meeting information Submitted Successful'
      );
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Meeting was not assigned successful');
      console.error(e);
    }
  }

  setFinesForNotAttending() {
    const fines = Object.keys(this.group?.fines).map((i) => {
      return { id: i, ...this.group?.fines[i] };
    });
    const fine = fines.find(
      (fine) => fine.type === 'Meeting' && fine.meeting_type === 'not_attending'
    );
    return fine;
  }

  selectMember(member: Member) {
    this.attendance[member.id] = !this.attendance[member.id];
    let allSelected = true;
    this.members.forEach((i) => {
      if (!this.attendance[i.id]) {
        allSelected = false;
      }
    });
    this.allSelected = allSelected;
  }

  setAllAttended($event: MatCheckboxChange) {
    if ($event.checked) {
      this.members.forEach((member) => (this.attendance[member.id] = true));
    } else {
      this.members.forEach((member) => (this.attendance[member.id] = false));
    }
  }
}
