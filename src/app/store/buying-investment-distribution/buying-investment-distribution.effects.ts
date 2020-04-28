import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './buying-investment-distribution.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class BuyingInvestmentDistributionEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getBuyingInvestmentDistributions),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
