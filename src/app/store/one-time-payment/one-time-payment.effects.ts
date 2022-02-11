import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './one-time-payment.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';
import {OneTimePayment} from './one-time-payment.model';

@Injectable()
export class OneTimePaymentEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getOneTimePayments),
    switchMap((action) => this.offlineService.getItems(DataKeys.OneTimePayments)),
    switchMap(oneTimePayments => {
      const paymentsToSave: OneTimePayment[] = [];
      oneTimePayments.forEach(payment => {
        if ('members' in payment) {
          Object.keys(payment.members).forEach((payItem: string) => {
            const pay = payment.members[payItem];
            paymentsToSave.push({
              id: pay.id,
              groupId: payment.groupId,
              memberId: pay.memberId,
              contributionId: payment.contributionId,
              last_update: payment.last_update,
              amount: pay.amount,
              date: pay.date,
              paymentMode: pay.paymentMode,
              referenceNumber: pay.referenceNumber,
            })
          });
        }
      });
      return [
      fromActions.loadOneTimePayments({oneTimePayments: paymentsToSave}),
      fromActions.doneLoadingOneTimePayments()
    ]})
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
