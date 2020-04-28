import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LoanQueue } from './loan-queue.model';

export const getLoanQueues = createAction(
  '[LoanQueue/API] Get LoanQueues'
);

export const doneLoadingLoanQueues = createAction(
  '[LoanQueue/API] Done Loading LoanQueues'
);

export const failLoadingLoanQueues = createAction(
  '[LoanQueue/API] Error Loading LoanQueues',
  props<{ error: any }>()
);

export const setSelectedLoanQueue = createAction(
  '[LoanQueue/API] Set Selected LoanQueues',
  props<{ loanQueueId: string }>()
);

export const loadLoanQueues = createAction(
  '[LoanQueue/API] Load LoanQueues',
  props<{ loanQueues: LoanQueue[] }>()
);

export const addLoanQueue = createAction(
  '[LoanQueue/API] Add LoanQueue',
  props<{ loanQueue: LoanQueue }>()
);

export const upsertLoanQueue = createAction(
  '[LoanQueue/API] Upsert LoanQueue',
  props<{ loanQueue: LoanQueue }>()
);

export const addLoanQueues = createAction(
  '[LoanQueue/API] Add LoanQueues',
  props<{ loanQueues: LoanQueue[] }>()
);

export const upsertLoanQueues = createAction(
  '[LoanQueue/API] Upsert LoanQueues',
  props<{ loanQueues: LoanQueue[] }>()
);

export const updateLoanQueue = createAction(
  '[LoanQueue/API] Update LoanQueue',
  props<{ loanQueue: Update<LoanQueue> }>()
);

export const updateLoanQueues = createAction(
  '[LoanQueue/API] Update LoanQueues',
  props<{ loanQueues: Update<LoanQueue>[] }>()
);

export const deleteLoanQueue = createAction(
  '[LoanQueue/API] Delete LoanQueue',
  props<{ id: string }>()
);

export const deleteLoanQueues = createAction(
  '[LoanQueue/API] Delete LoanQueues',
  props<{ ids: string[] }>()
);

export const clearLoanQueues = createAction(
  '[LoanQueue/API] Clear LoanQueues'
);
