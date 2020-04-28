import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './meeting.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class MeetingEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMeetings),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
