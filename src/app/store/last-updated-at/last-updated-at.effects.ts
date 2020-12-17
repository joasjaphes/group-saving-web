import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './last-updated-at.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class LastUpdatedAtEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLastUpdatedAts),
    switchMap((action) => this.offlineService.getItems(DataKeys.LastUpdatedTable)),
    switchMap(lastUpdatedAts => [
      fromActions.loadLastUpdatedAts({lastUpdatedAts}),
      fromActions.doneLoadingLastUpdatedAts()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}
}
