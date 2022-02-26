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
      const paymentsToSave: Payment[] = [];
      payments.forEach(payment => {
        if ('members' in payment) {
          Object.keys(payment.members).forEach((payItem: string) => {
            const pay = payment.members[payItem];
            paymentsToSave.push(
              {
                id: pay.id,
                groupId: payment.groupId,
                isActive: true,
                last_update: payment.last_update,
                additionalConfig: {},
                date: pay.date,
                month: payment.month,
                week: payment.week,
                year: payment.year,
                period: payment.period,
                memberId: pay.memberId,
                paymentMode: pay.paymentMode,
                referenceNumber: pay.referenceNumber,
                paymentType: pay.paymentType,
                confirmationMessage: pay.confirmationMessage,
                fileUrl: pay.fileUrl,
                contributions: pay.contributions,
                fines: pay.fines,
                loans: pay.loans,
                is_pending: false,
              }
            );
          });
        } else {
          paymentsToSave.push(payment);
        }
        for (const payItem of paymentsToSave) {
          if (payItem.fines) {
            const fine = Object.keys(payItem.fines).map(
              fineKey => {
                const fineAmount = payItem.fines[fineKey] + '';
                if (!!fineAmount) {
                  return {
                    id: payItem.id + fineKey,
                    group_id: payItem.memberId,
                    member_id: payItem.memberId,
                    amount: parseFloat(fineAmount),
                    date: payItem.date,
                    month: payItem.month,
                    year: payItem.year,
                    payment_mode: payItem.paymentMode,
                    payment_type: payItem.paymentType,
                    reference_number: payItem.referenceNumber,
                    fine_id: fineKey
                  };
                }
              }
            );
            fines.push(...fine);
          }
        }

      });
      return [
        // fromActions.upsertPayments({payments}),
        fromActions.loadPayments({payments: paymentsToSave}),
        fineActions.loadFines({fines}),
        fromActions.doneLoadingPayments()
      ];
    })
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
