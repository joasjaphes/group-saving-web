import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './loan.actions';
import * as fromPaymentActions from '../payment/payment.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class LoanEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoans),
    switchMap((action) => this.offlineService.getItems(DataKeys.Loan)),
    switchMap(loans => {
      const payments = [];
      const loansToSave = [];
      if (loans) {
        loans.forEach(loan => {
          if ('loans' in loan) {
            Object.keys(loan.loans).forEach((loanItem) => {
              const mkopo = loan.loans[loanItem];
              loansToSave.push({
                ...mkopo,
                groupId: loan.groupId,
                last_update: loan.last_update
              });
            });
          } else {
            loansToSave.push(loan);
            // TODO: Remove this once we are done with migration
            if (loan.payments && loan.payments.length > 0) {
              loan.payments.forEach(payment => {
                if (payment.from_previous_loan) {
                  payments.push({
                    id: payment.id,
                    groupId: loan.group_id,
                    date: payment.date,
                    month: payment.month,
                    year: payment.year,
                    week: payment.week,
                    memberId: payment.member_id,
                    contributions: {},
                    fines: {},
                    loans: {
                      [loan.id]: payment.amount,
                    },
                    totalAmount: payment.amount,
                  });
                }
              });
            }
          }
        });
      }
      return [
        fromActions.upsertLoans({loans: loansToSave}),
        fromPaymentActions.upsertPayments({payments}),
        fromActions.doneLoadingLoans()
      ];
    })
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
