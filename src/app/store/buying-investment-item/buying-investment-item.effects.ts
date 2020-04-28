import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './buying-investment-item.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class BuyingInvestmentItemEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getBuyingInvestmentItems),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
