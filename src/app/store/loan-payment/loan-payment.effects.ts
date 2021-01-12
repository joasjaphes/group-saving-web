import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './loan-payment.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class LoanPaymentEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoanPayments),
    switchMap((action) => this.offlineService.getItems(DataKeys.LoanPayment)),
    switchMap(loanPayments => [
      fromActions.upsertLoanPayments({loanPayments}),
      fromActions.doneLoadingLoanPayments()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
