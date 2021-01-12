import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './adjustment.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class AdjustmentEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getAdjustments),
    switchMap((action) => this.offlineService.getItems(DataKeys.Adjustments)),
    switchMap(adjustments => [
      fromActions.upsertAdjustments({adjustments}),
      fromActions.doneLoadingAdjustments()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}
}
