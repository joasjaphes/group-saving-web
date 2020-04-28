import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './adjustment.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class AdjustmentEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getAdjustments),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
