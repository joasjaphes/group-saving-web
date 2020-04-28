import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Payment } from './payment.model';

export const getPayments = createAction(
  '[Payment/API] Get Payments'
);

export const doneLoadingPayments = createAction(
  '[Payment/API] Done Loading Payments'
);

export const failLoadingPayments = createAction(
  '[Payment/API] Error Loading Payments',
  props<{ error: any }>()
);

export const setSelectedPayment = createAction(
  '[Payment/API] Set Selected Payments',
  props<{ paymentId: string }>()
);

export const loadPayments = createAction(
  '[Payment/API] Load Payments',
  props<{ payments: Payment[] }>()
);

export const addPayment = createAction(
  '[Payment/API] Add Payment',
  props<{ payment: Payment }>()
);

export const upsertPayment = createAction(
  '[Payment/API] Upsert Payment',
  props<{ payment: Payment }>()
);

export const addPayments = createAction(
  '[Payment/API] Add Payments',
  props<{ payments: Payment[] }>()
);

export const upsertPayments = createAction(
  '[Payment/API] Upsert Payments',
  props<{ payments: Payment[] }>()
);

export const updatePayment = createAction(
  '[Payment/API] Update Payment',
  props<{ payment: Update<Payment> }>()
);

export const updatePayments = createAction(
  '[Payment/API] Update Payments',
  props<{ payments: Update<Payment>[] }>()
);

export const deletePayment = createAction(
  '[Payment/API] Delete Payment',
  props<{ id: string }>()
);

export const deletePayments = createAction(
  '[Payment/API] Delete Payments',
  props<{ ids: string[] }>()
);

export const clearPayments = createAction(
  '[Payment/API] Clear Payments'
);
