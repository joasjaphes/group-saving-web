import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './group.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class GroupEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getGroups),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
