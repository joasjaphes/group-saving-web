import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './payment.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class PaymentEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getPayments),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
