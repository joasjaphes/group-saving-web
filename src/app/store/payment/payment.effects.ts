import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './payment.actions';
import * as fineActions from '../fine/fine.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';
import * as helpers from '../../../../functions/src/helpers';
import {Payment} from './payment.model';

@Injectable()
export class PaymentEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getPayments),
    switchMap((action) => this.offlineService.getItems(DataKeys.Payments)),
    switchMap((payments: Payment[]) => {
      const fines = [];
      payments.forEach(payment => {
        if (payment.fines) {
          const fine = Object.keys(payment.fines).map(
            fineKey => {
              const fineAmount = payment.fines[fineKey] + '';
              if (!!fineAmount) {
                return {
                   id: payment.id + fineKey,
                    group_id: payment.memberId,
                    member_id: payment.memberId,
                    amount: parseFloat(fineAmount),
                    date: payment.date,
                    month: payment.month,
                    year: payment.year,
                    payment_mode: payment.paymentMode,
                    payment_type: payment.paymentType,
                    reference_number: payment.referenceNumber,
                    fine_id: fineKey
                };
              }
            }
          );
          fines.push(...fine);
        }
      });
      return [
        fromActions.upsertPayments({payments}),
        fineActions.upsertFines({fines}),
        fromActions.doneLoadingPayments()
      ];
    })
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
