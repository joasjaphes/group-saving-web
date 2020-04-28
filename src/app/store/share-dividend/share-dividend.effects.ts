import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './share-dividend.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class ShareDividendEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getShareDividends),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
