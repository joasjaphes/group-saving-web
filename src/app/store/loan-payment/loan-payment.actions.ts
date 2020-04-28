import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LoanPayment } from './loan-payment.model';

export const getLoanPayments = createAction(
  '[LoanPayment/API] Get LoanPayments'
);

export const doneLoadingLoanPayments = createAction(
  '[LoanPayment/API] Done Loading LoanPayments'
);

export const failLoadingLoanPayments = createAction(
  '[LoanPayment/API] Error Loading LoanPayments',
  props<{ error: any }>()
);

export const setSelectedLoanPayment = createAction(
  '[LoanPayment/API] Set Selected LoanPayments',
  props<{ loanPaymentId: string }>()
);

export const loadLoanPayments = createAction(
  '[LoanPayment/API] Load LoanPayments',
  props<{ loanPayments: LoanPayment[] }>()
);

export const addLoanPayment = createAction(
  '[LoanPayment/API] Add LoanPayment',
  props<{ loanPayment: LoanPayment }>()
);

export const upsertLoanPayment = createAction(
  '[LoanPayment/API] Upsert LoanPayment',
  props<{ loanPayment: LoanPayment }>()
);

export const addLoanPayments = createAction(
  '[LoanPayment/API] Add LoanPayments',
  props<{ loanPayments: LoanPayment[] }>()
);

export const upsertLoanPayments = createAction(
  '[LoanPayment/API] Upsert LoanPayments',
  props<{ loanPayments: LoanPayment[] }>()
);

export const updateLoanPayment = createAction(
  '[LoanPayment/API] Update LoanPayment',
  props<{ loanPayment: Update<LoanPayment> }>()
);

export const updateLoanPayments = createAction(
  '[LoanPayment/API] Update LoanPayments',
  props<{ loanPayments: Update<LoanPayment>[] }>()
);

export const deleteLoanPayment = createAction(
  '[LoanPayment/API] Delete LoanPayment',
  props<{ id: string }>()
);

export const deleteLoanPayments = createAction(
  '[LoanPayment/API] Delete LoanPayments',
  props<{ ids: string[] }>()
);

export const clearLoanPayments = createAction(
  '[LoanPayment/API] Clear LoanPayments'
);
