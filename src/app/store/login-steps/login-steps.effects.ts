import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './login-steps.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class LoginStepsEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoginSteps),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
