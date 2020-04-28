import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LoanType } from './loan-type.model';

export const getLoanTypes = createAction(
  '[LoanType/API] Get LoanTypes'
);

export const doneLoadingLoanTypes = createAction(
  '[LoanType/API] Done Loading LoanTypes'
);

export const failLoadingLoanTypes = createAction(
  '[LoanType/API] Error Loading LoanTypes',
  props<{ error: any }>()
);

export const setSelectedLoanType = createAction(
  '[LoanType/API] Set Selected LoanTypes',
  props<{ loanTypeId: string }>()
);

export const loadLoanTypes = createAction(
  '[LoanType/API] Load LoanTypes',
  props<{ loanTypes: LoanType[] }>()
);

export const addLoanType = createAction(
  '[LoanType/API] Add LoanType',
  props<{ loanType: LoanType }>()
);

export const upsertLoanType = createAction(
  '[LoanType/API] Upsert LoanType',
  props<{ loanType: LoanType }>()
);

export const addLoanTypes = createAction(
  '[LoanType/API] Add LoanTypes',
  props<{ loanTypes: LoanType[] }>()
);

export const upsertLoanTypes = createAction(
  '[LoanType/API] Upsert LoanTypes',
  props<{ loanTypes: LoanType[] }>()
);

export const updateLoanType = createAction(
  '[LoanType/API] Update LoanType',
  props<{ loanType: Update<LoanType> }>()
);

export const updateLoanTypes = createAction(
  '[LoanType/API] Update LoanTypes',
  props<{ loanTypes: Update<LoanType>[] }>()
);

export const deleteLoanType = createAction(
  '[LoanType/API] Delete LoanType',
  props<{ id: string }>()
);

export const deleteLoanTypes = createAction(
  '[LoanType/API] Delete LoanTypes',
  props<{ ids: string[] }>()
);

export const clearLoanTypes = createAction(
  '[LoanType/API] Clear LoanTypes'
);
