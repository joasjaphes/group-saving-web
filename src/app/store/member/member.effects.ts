import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './member.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class MemberEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getMembers),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
