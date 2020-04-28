import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './cash-transfer.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class CashTransferEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getCashTransfers),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
