import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './loan-type.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class LoanTypeEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoanTypes),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
