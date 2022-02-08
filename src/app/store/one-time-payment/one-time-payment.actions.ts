import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { OneTimePayment } from './one-time-payment.model';

export const getOneTimePayments = createAction(
  '[OneTimePayment/API] Get OneTimePayments'
);

export const doneLoadingOneTimePayments = createAction(
  '[OneTimePayment/API] Done Loading OneTimePayments'
);

export const failLoadingOneTimePayments = createAction(
  '[OneTimePayment/API] Error Loading OneTimePayments',
  props<{ error: any }>()
);

export const setSelectedOneTimePayment = createAction(
  '[OneTimePayment/API] Set Selected OneTimePayments',
  props<{ oneTimePaymentId: string }>()
);

export const loadOneTimePayments = createAction(
  '[OneTimePayment/API] Load OneTimePayments',
  props<{ oneTimePayments: OneTimePayment[] }>()
);

export const addOneTimePayment = createAction(
  '[OneTimePayment/API] Add OneTimePayment',
  props<{ oneTimePayment: OneTimePayment }>()
);

export const upsertOneTimePayment = createAction(
  '[OneTimePayment/API] Upsert OneTimePayment',
  props<{ oneTimePayment: OneTimePayment }>()
);

export const addOneTimePayments = createAction(
  '[OneTimePayment/API] Add OneTimePayments',
  props<{ oneTimePayments: OneTimePayment[] }>()
);

export const upsertOneTimePayments = createAction(
  '[OneTimePayment/API] Upsert OneTimePayments',
  props<{ oneTimePayments: OneTimePayment[] }>()
);

export const updateOneTimePayment = createAction(
  '[OneTimePayment/API] Update OneTimePayment',
  props<{ oneTimePayment: Update<OneTimePayment> }>()
);

export const updateOneTimePayments = createAction(
  '[OneTimePayment/API] Update OneTimePayments',
  props<{ oneTimePayments: Update<OneTimePayment>[] }>()
);

export const deleteOneTimePayment = createAction(
  '[OneTimePayment/API] Delete OneTimePayment',
  props<{ id: string }>()
);

export const deleteOneTimePayments = createAction(
  '[OneTimePayment/API] Delete OneTimePayments',
  props<{ ids: string[] }>()
);

export const clearOneTimePayments = createAction(
  '[OneTimePayment/API] Clear OneTimePayments'
);
