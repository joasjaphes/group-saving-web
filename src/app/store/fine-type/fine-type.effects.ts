import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './fine-type.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class FineTypeEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getFineTypes),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
