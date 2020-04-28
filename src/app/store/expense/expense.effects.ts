import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './expense.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class ExpenseEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getExpenses),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
