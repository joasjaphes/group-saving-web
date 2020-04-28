import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './payment-item.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class PaymentItemEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getPaymentItems),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
