import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LoanRequest } from './loan-request.model';

export const getLoanRequests = createAction(
  '[LoanRequest/API] Get LoanRequests'
);

export const doneLoadingLoanRequests = createAction(
  '[LoanRequest/API] Done Loading LoanRequests'
);

export const failLoadingLoanRequests = createAction(
  '[LoanRequest/API] Error Loading LoanRequests',
  props<{ error: any }>()
);

export const setSelectedLoanRequest = createAction(
  '[LoanRequest/API] Set Selected LoanRequests',
  props<{ loanRequestId: string }>()
);

export const loadLoanRequests = createAction(
  '[LoanRequest/API] Load LoanRequests',
  props<{ loanRequests: LoanRequest[] }>()
);

export const addLoanRequest = createAction(
  '[LoanRequest/API] Add LoanRequest',
  props<{ loanRequest: LoanRequest }>()
);

export const upsertLoanRequest = createAction(
  '[LoanRequest/API] Upsert LoanRequest',
  props<{ loanRequest: LoanRequest }>()
);

export const addLoanRequests = createAction(
  '[LoanRequest/API] Add LoanRequests',
  props<{ loanRequests: LoanRequest[] }>()
);

export const upsertLoanRequests = createAction(
  '[LoanRequest/API] Upsert LoanRequests',
  props<{ loanRequests: LoanRequest[] }>()
);

export const updateLoanRequest = createAction(
  '[LoanRequest/API] Update LoanRequest',
  props<{ loanRequest: Update<LoanRequest> }>()
);

export const updateLoanRequests = createAction(
  '[LoanRequest/API] Update LoanRequests',
  props<{ loanRequests: Update<LoanRequest>[] }>()
);

export const deleteLoanRequest = createAction(
  '[LoanRequest/API] Delete LoanRequest',
  props<{ id: string }>()
);

export const deleteLoanRequests = createAction(
  '[LoanRequest/API] Delete LoanRequests',
  props<{ ids: string[] }>()
);

export const clearLoanRequests = createAction(
  '[LoanRequest/API] Clear LoanRequests'
);
