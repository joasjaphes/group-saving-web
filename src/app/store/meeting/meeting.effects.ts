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
    switchMap(meetings => [
      fromActions.loadMeetings({meetings}),
      fromActions.doneLoadingMeetings()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
