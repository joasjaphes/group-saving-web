import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './payment.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';
import * as helpers from '../../../../functions/src/helpers';

@Injectable()
export class PaymentEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getPayments),
    switchMap((action) => this.offlineService.getItems(DataKeys.Payments)),
    switchMap(payments => {
      // fine Data
      // id: paymentId + fineType.id,
      //   group_id: data.memberId,
      //   member_id: data.memberId,
      //   amount: parseFloat(fineAmount),
      //   date: helpers.formatDate(data.date),
      //   month: group.track_contribution_period ? data.month : helpers.getMonth(data.date),
      //   year: group.track_contribution_period ? data.year : helpers.getYear(data.date),
      //   payment_mode: data.paymentMode,
      //   payment_type: data.paymentType,
      //   reference_number: data.referenceNumber,
      //   fine_id: fineType.id
      return [
        fromActions.upsertPayments({payments}),
        fromActions.doneLoadingPayments()
      ];
    })
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
