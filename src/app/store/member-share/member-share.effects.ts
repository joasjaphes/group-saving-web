import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './member-share.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class MemberShareEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMemberShares),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
