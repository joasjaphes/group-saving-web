import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './last-updated-at.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class LastUpdatedAtEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLastUpdatedAts),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
