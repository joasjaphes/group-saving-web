import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {GroupProgress} from '../../../../store/group/group-progress.model';
import {fadeIn} from '../../../../shared/animations/router-animation';
import {FunctionsService} from '../../../../services/functions.service';
import {CommonService} from '../../../../services/common.service';
import {MatSelectChange} from '@angular/material/select';
import {Observable} from 'rxjs';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import * as contributionSelector from '../../../../store/contribution-type/contribution-type.selectors';

@Component({
  selector: 'app-starting-meeting-rules',
  templateUrl: './starting-meeting-rules.component.html',
  styleUrls: ['./starting-meeting-rules.component.scss'],
  animations: [fadeIn]
})
export class StartingMeetingRulesComponent implements OnInit {
  @Input() group: Group;
  @Input() progressDetails: GroupProgress;

  @Output() closeForm = new EventEmitter();
  contributionTypes$: Observable<ContributionType[]>;
  meetingFrequency: string;
  memberMustAttend: string;
  allowFineForLate: string;
  allowFineForNotAttending: string;
  lateFineAmount: string;
  notAttendingFineAmount: string;
  lateFineName: string;
  notAttendingFineName: string;
  addNotAttendingFineTo: string;
  addLateFineTo: string;

  loading = false;

  constructor(
    private functionsService: FunctionsService,
    private commonService: CommonService,
    private store: Store<ApplicationState>,
  ) {
    this.contributionTypes$ = this.store.pipe(select(contributionSelector.selectAll));
  }

  ngOnInit(): void {
    if (this.group) {
      this.meetingFrequency = this.group.meeting_settings ? this.group.meeting_settings.meeting_frequency : '';
    }
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      frequency: this.meetingFrequency,
      must_attend: this.memberMustAttend,
      allow_late_fine: this.allowFineForLate,
      allow_not_attending_fine: this.allowFineForNotAttending,
      late_fine_amount: this.lateFineAmount,
      not_attending_fine_amount: this.notAttendingFineAmount,
      late_fine_name: this.lateFineName,
      not_attending_fine_name: this.notAttendingFineName,
      add_not_attending_fine_to: this.addNotAttendingFineTo,
      add_late_fine_to: this.addLateFineTo,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('setMeetingDetails', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Group meeting information set successful');
      this.close();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  close() {
    this.closeForm.emit();
  }

  setLateMeetingFine($event: MatSelectChange) {
    if ($event.value === 'Yes') {
      this.lateFineName = 'Fine for being late to a meeting';
    }
  }

  setNotAttendingLMeetingFine($event: MatSelectChange) {
    if ($event.value === 'Yes') {
      this.notAttendingFineName = 'Fine for not attending a meeting';
    }
  }
}
