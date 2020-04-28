import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './contribution-type-balance.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class ContributionTypeBalanceEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getContributionTypeBalances),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
