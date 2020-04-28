import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './member-balance.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class MemberBalanceEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMemberBalances),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
