import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Expense } from './expense.model';

export const getExpenses = createAction(
  '[Expense/API] Get Expenses'
);

export const doneLoadingExpenses = createAction(
  '[Expense/API] Done Loading Expenses'
);

export const failLoadingExpenses = createAction(
  '[Expense/API] Error Loading Expenses',
  props<{ error: any }>()
);

export const setSelectedExpense = createAction(
  '[Expense/API] Set Selected Expenses',
  props<{ expenseId: string }>()
);

export const loadExpenses = createAction(
  '[Expense/API] Load Expenses',
  props<{ expenses: Expense[] }>()
);

export const addExpense = createAction(
  '[Expense/API] Add Expense',
  props<{ expense: Expense }>()
);

export const upsertExpense = createAction(
  '[Expense/API] Upsert Expense',
  props<{ expense: Expense }>()
);

export const addExpenses = createAction(
  '[Expense/API] Add Expenses',
  props<{ expenses: Expense[] }>()
);

export const upsertExpenses = createAction(
  '[Expense/API] Upsert Expenses',
  props<{ expenses: Expense[] }>()
);

export const updateExpense = createAction(
  '[Expense/API] Update Expense',
  props<{ expense: Update<Expense> }>()
);

export const updateExpenses = createAction(
  '[Expense/API] Update Expenses',
  props<{ expenses: Update<Expense>[] }>()
);

export const deleteExpense = createAction(
  '[Expense/API] Delete Expense',
  props<{ id: string }>()
);

export const deleteExpenses = createAction(
  '[Expense/API] Delete Expenses',
  props<{ ids: string[] }>()
);

export const clearExpenses = createAction(
  '[Expense/API] Clear Expenses'
);
