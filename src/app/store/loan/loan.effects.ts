import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './loan.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class LoanEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoans),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
