import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './announcement.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class AnnouncementEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getAnnouncements),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
