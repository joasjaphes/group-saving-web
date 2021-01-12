import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './loan.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class LoanEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoans),
    switchMap((action) => this.offlineService.getItems(DataKeys.Loan)),
    switchMap(loans => [
      fromActions.upsertLoans({loans}),
      fromActions.doneLoadingLoans()
    ])
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
