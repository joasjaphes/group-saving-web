import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './meeting.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class MeetingEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMeetings),
    switchMap((action) => this.offlineService.getItems(DataKeys.Meeting)),
    switchMap(meetings => {
      const meetingsToSave = [];
      for (const meeting of meetings) {
        if ('meetings' in meeting) {
          Object.keys(meeting.meetings).forEach(meetingId => {
            const meetingData = meeting.meetings[meetingId];
            meetingsToSave.push({
              ...meetingData,
              last_update: meeting.last_update
            });
          });
        } else {
          meetingsToSave.push(meeting);
        }
      }
      return [
      fromActions.upsertMeetings({meetings: meetingsToSave}),
      fromActions.doneLoadingMeetings()
    ];
    })
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
