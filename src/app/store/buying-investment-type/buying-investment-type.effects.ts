import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './buying-investment-type.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class BuyingInvestmentTypeEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getBuyingInvestmentTypes),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
