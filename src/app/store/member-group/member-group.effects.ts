import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './member-group.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class MemberGroupEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMemberGroups),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
