import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './long-term-investment-item.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class LongTermInvestmentItemEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLongTermInvestmentItems),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
