import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './contribution-type.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class ContributionTypeEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getContributionTypes),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
