import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ExpenseType } from './expense-type.model';

export const getExpenseTypes = createAction(
  '[ExpenseType/API] Get ExpenseTypes'
);

export const doneLoadingExpenseTypes = createAction(
  '[ExpenseType/API] Done Loading ExpenseTypes'
);

export const failLoadingExpenseTypes = createAction(
  '[ExpenseType/API] Error Loading ExpenseTypes',
  props<{ error: any }>()
);

export const setSelectedExpenseType = createAction(
  '[ExpenseType/API] Set Selected ExpenseTypes',
  props<{ expenseTypeId: string }>()
);

export const loadExpenseTypes = createAction(
  '[ExpenseType/API] Load ExpenseTypes',
  props<{ expenseTypes: ExpenseType[] }>()
);

export const addExpenseType = createAction(
  '[ExpenseType/API] Add ExpenseType',
  props<{ expenseType: ExpenseType }>()
);

export const upsertExpenseType = createAction(
  '[ExpenseType/API] Upsert ExpenseType',
  props<{ expenseType: ExpenseType }>()
);

export const addExpenseTypes = createAction(
  '[ExpenseType/API] Add ExpenseTypes',
  props<{ expenseTypes: ExpenseType[] }>()
);

export const upsertExpenseTypes = createAction(
  '[ExpenseType/API] Upsert ExpenseTypes',
  props<{ expenseTypes: ExpenseType[] }>()
);

export const updateExpenseType = createAction(
  '[ExpenseType/API] Update ExpenseType',
  props<{ expenseType: Update<ExpenseType> }>()
);

export const updateExpenseTypes = createAction(
  '[ExpenseType/API] Update ExpenseTypes',
  props<{ expenseTypes: Update<ExpenseType>[] }>()
);

export const deleteExpenseType = createAction(
  '[ExpenseType/API] Delete ExpenseType',
  props<{ id: string }>()
);

export const deleteExpenseTypes = createAction(
  '[ExpenseType/API] Delete ExpenseTypes',
  props<{ ids: string[] }>()
);

export const clearExpenseTypes = createAction(
  '[ExpenseType/API] Clear ExpenseTypes'
);
