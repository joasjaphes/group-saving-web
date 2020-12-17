import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from './expense.actions';
import {switchMap, tap} from 'rxjs/operators';
import {OfflineManagerService} from '../../services/offline-manager.service';
import {DataKeys} from '../data-keys';

@Injectable()
export class ExpenseEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getExpenses),
    switchMap((action) => this.offlineService.getItems(DataKeys.Expense)),
    switchMap(expenses => [
      fromActions.loadExpenses({expenses}),
      fromActions.doneLoadingExpenses()
    ])
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
