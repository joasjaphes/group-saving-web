import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './fine.actions';
import {tap} from 'rxjs/operators';



@Injectable()
export class FineEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getFines),
    tap(() => {
      // codes to get data here
    })
  ), { dispatch: false });

  constructor(private actions$: Actions) {}

}
