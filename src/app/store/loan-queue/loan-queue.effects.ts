import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './loan-queue.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class LoanQueueEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getLoanQueues),
    switchMap((action) => this.offlineService.getItems(DataKeys.LoanQueue)),
    switchMap(loanQueues => [
      fromActions.loadLoanQueues({loanQueues}),
      fromActions.doneLoadingLoanQueues()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
