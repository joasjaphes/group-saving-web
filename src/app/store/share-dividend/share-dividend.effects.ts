import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './share-dividend.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class ShareDividendEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getShareDividends),
    switchMap((action) => this.offlineService.getItems(DataKeys.ShareDividend)),
    switchMap(shareDividends => [
      fromActions.upsertShareDividends({shareDividends}),
      fromActions.doneLoadingShareDividends()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
