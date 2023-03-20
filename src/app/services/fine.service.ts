import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '../store';
import { CommonService } from './common.service';
import * as fromFineTypes from '../store/fine-type/fine-type.selectors';
import * as fromMember from '../store/member/member.selectors';
import { ExpectedFine } from '../store/expected-fines/expected-fines.model';
import { numberWithCommas } from '../store/fine-type/fine-type.selectors';
import { selectGroupId } from '../store/user/user.selectors';
import * as fromMeeting from '../store/meeting/meeting.selectors';
import * as fromPayment from '../store/payment/payment.selectors';
import * as fromGroup from '../store/group/group.selectors';
import { first } from 'rxjs/operators';
import {
  addExpectedFines,
  deleteExpectedFines,
  upsertExpectedFines,
} from '../store/expected-fines/expected-fines.actions';
// import { addExpectedFines } from 'functions/src/contribution/add_expected_fines';

@Injectable({
  providedIn: 'root',
})
export class FineService {
  constructor(
    private commonService: CommonService,
    private store: Store<ApplicationState>
  ) {}

  async setExpectedFinesForNotAttendingMeetings(year = 'All', month = 'All') {
    try {
      const group = await this.store
        .pipe(
          select(fromGroup.selected),
          first((i) => !!i)
        )
        .toPromise();
      const meetings = await this.store
        .pipe(
          select(fromMeeting.selectDetailed),
          first((i) => !!i)
        )
        .toPromise();
      const memberEntities = await this.store
        .pipe(
          select(fromMember.selectEntities),
          first((i) => !!i)
        )
        .toPromise();
      const fineType = await this.store
        .pipe(
          select(fromFineTypes.selectMeetingNotAttendingFineType),
          first((i) => !!i)
        )
        .toPromise();
      const payments = await this.store
        .pipe(
          select(fromPayment.selectFinesDetailedGroupByMember(year, 'All')),
          first((i) => !!i)
        )
        .toPromise();
      let fines = {};
      const allMembersIds = Object.keys(memberEntities);
      this.store.dispatch(
        deleteExpectedFines({
          ids: allMembersIds.map((i) => `${i}_${fineType.id}`),
        })
      );
      let expectedFines: ExpectedFine[] = [];
      for (const member of allMembersIds) {
        const memberPayments = payments
          .filter((pay) => pay.id === member && !!pay.totals[fineType.id])
          .map((i) => i.totals[fineType.id]?.amount);
        for (const meeting of meetings) {
          if (
            !meeting.attendance.includes(member) &&
            group.meeting_settings.allow_not_attending_fine
          ) {
            // const fineAmount =  group.meeting_settings?.not_attending_fine_amount;
            if (memberPayments.length) {
              const totalPaid = memberPayments.reduce((i, j) => i + j);
              fines[member] = fines[member] - totalPaid;
            }
            if (fines[member]) {
              fines[member] +=
                group.meeting_settings?.not_attending_fine_amount;
            } else {
              fines[member] = group.meeting_settings?.not_attending_fine_amount;
            }
          }
        }
        if (memberPayments.length) {
          const totalPaid = memberPayments.reduce((i, j) => i + j);
          fines[member] = fines[member] - totalPaid;
        }
        if (fines[member] && fines[member] <= 0) {
          delete fines[member];
        }

        if (fines[member]) {
          expectedFines.push({
            id: `${member}_${fineType.id}`,
            memberId: member,
            groupId: group.id,
            month: '',
            year: '',
            date: '',
            last_update: '',
            period: ``,
            week: '',
            fines: {
              [fineType.id]: fines[member],
            },
          });
        }
      }
      this.store.dispatch(upsertExpectedFines({ expectedFines }));
    } catch (e) {}
  }
}
