import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './loan-request.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';
import {LoanRequest} from './loan-request.model';

@Injectable()
export class LoanRequestEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoanRequests),
    switchMap((action) => this.offlineService.getItems(DataKeys.LoanRequest)),
    switchMap(loanRequests => {
      const finesToSave: LoanRequest[] = [];
      loanRequests.forEach((fine) => {
        if ('loans' in fine) {
          fine.fines.forEach(item => {
            finesToSave.push({
              ...item,
              last_update: fine.last_update
            });
          });
        }
      });
      return [
        fromActions.upsertLoanRequests({loanRequests: finesToSave}),
        fromActions.doneLoadingLoanRequests()
      ];
    })
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {
  }

}
