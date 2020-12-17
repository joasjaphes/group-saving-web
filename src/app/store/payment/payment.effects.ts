import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './payment.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class PaymentEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getPayments),
    switchMap((action) => this.offlineService.getItems(DataKeys.Payments)),
    switchMap(payments => [
      fromActions.loadPayments({payments}),
      fromActions.doneLoadingPayments()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
