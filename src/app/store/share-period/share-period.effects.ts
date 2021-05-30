import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './share-period.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class SharePeriodEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getSharePeriods),
    switchMap((action) => this.offlineService.getItems(DataKeys.SharePeriods)),
    switchMap(sharePeriods => [
      fromActions.upsertSharePeriods({sharePeriods}),
      fromActions.doneLoadingSharePeriods()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}
}
