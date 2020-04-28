import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Loan } from './loan.model';

export const getLoans = createAction(
  '[Loan/API] Get Loans'
);

export const doneLoadingLoans = createAction(
  '[Loan/API] Done Loading Loans'
);

export const failLoadingLoans = createAction(
  '[Loan/API] Error Loading Loans',
  props<{ error: any }>()
);

export const setSelectedLoan = createAction(
  '[Loan/API] Set Selected Loans',
  props<{ loanId: string }>()
);

export const loadLoans = createAction(
  '[Loan/API] Load Loans',
  props<{ loans: Loan[] }>()
);

export const addLoan = createAction(
  '[Loan/API] Add Loan',
  props<{ loan: Loan }>()
);

export const upsertLoan = createAction(
  '[Loan/API] Upsert Loan',
  props<{ loan: Loan }>()
);

export const addLoans = createAction(
  '[Loan/API] Add Loans',
  props<{ loans: Loan[] }>()
);

export const upsertLoans = createAction(
  '[Loan/API] Upsert Loans',
  props<{ loans: Loan[] }>()
);

export const updateLoan = createAction(
  '[Loan/API] Update Loan',
  props<{ loan: Update<Loan> }>()
);

export const updateLoans = createAction(
  '[Loan/API] Update Loans',
  props<{ loans: Update<Loan>[] }>()
);

export const deleteLoan = createAction(
  '[Loan/API] Delete Loan',
  props<{ id: string }>()
);

export const deleteLoans = createAction(
  '[Loan/API] Delete Loans',
  props<{ ids: string[] }>()
);

export const clearLoans = createAction(
  '[Loan/API] Clear Loans'
);
