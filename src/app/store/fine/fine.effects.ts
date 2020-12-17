import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './fine.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class FineEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getFines),
    switchMap((action) => this.offlineService.getItems(DataKeys.Fine)),
    switchMap(fines => [
      fromActions.loadFines({fines}),
      fromActions.doneLoadingFines()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
