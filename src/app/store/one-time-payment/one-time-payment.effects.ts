import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './one-time-payment.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class OneTimePaymentEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getOneTimePayments),
    switchMap((action) => this.offlineService.getItems(DataKeys.OneTimePayments)),
    switchMap(oneTimePayments => [
      fromActions.upsertOneTimePayments({oneTimePayments}),
      fromActions.doneLoadingOneTimePayments()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
