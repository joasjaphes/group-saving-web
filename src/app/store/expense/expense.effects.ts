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
    switchMap(expenses => {
      const expenseToSave = [];
      for (const expense of expenses) {
        if ('expenses' in expense) {
          Object.keys(expense.expenses).forEach(expenseId => {
            const expenseData = expense.expenses[expenseId];
            expenseToSave.push({
              ...expenseData,
            });
          });
        } else {
          expenseToSave.push(expense);
        }
      }
      return [
        fromActions.upsertExpenses({expenses: expenseToSave}),
        fromActions.doneLoadingExpenses()
      ];
    })
  ));

  constructor(
    private actions$: Actions,
    private offlineService: OfflineManagerService,
  ) {}

}
