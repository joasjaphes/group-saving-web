import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './loan-type.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class LoanTypeEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoanTypes),
    switchMap((action) => this.offlineService.getItems(DataKeys.LoanType)),
    switchMap(loanTypes => [
      fromActions.upsertLoanTypes({loanTypes}),
      fromActions.doneLoadingLoanTypes()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
