import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './payment-item.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class PaymentItemEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getPaymentItems),
    switchMap((action) => this.offlineService.getItems(DataKeys.PaymentItem)),
    switchMap(paymentItems => [
      fromActions.loadPaymentItems({paymentItems}),
      fromActions.doneLoadingPaymentItems()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
