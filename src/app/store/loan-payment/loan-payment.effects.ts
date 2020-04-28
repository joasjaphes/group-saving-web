import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './loan-payment.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class LoanPaymentEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoanPayments),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
