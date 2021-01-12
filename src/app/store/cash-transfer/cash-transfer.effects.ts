import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './cash-transfer.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class CashTransferEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getCashTransfers),
    switchMap((action) => this.offlineService.getItems(DataKeys.CashTransfer)),
    switchMap(cashTransfers => [
      fromActions.upsertCashTransfers({cashTransfers}),
      fromActions.doneLoadingCashTransfers()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
