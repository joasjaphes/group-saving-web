import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './user.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class UserEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getUsers),
    tap(() => {
      // codes to get data here
    })
  ));

  constructor(private actions$: Actions) {}

}
