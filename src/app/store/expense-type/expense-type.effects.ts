import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './expense-type.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class ExpenseTypeEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getExpenseTypes),
    switchMap((action) => this.offlineService.getItems(DataKeys.ExpenseType)),
    switchMap(expenseTypes => [
      fromActions.loadExpenseTypes({expenseTypes}),
      fromActions.doneLoadingExpenseTypes()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
