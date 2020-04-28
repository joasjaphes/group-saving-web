import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { PaymentItem } from './payment-item.model';

export const getPaymentItems = createAction(
  '[PaymentItem/API] Get PaymentItems'
);

export const doneLoadingPaymentItems = createAction(
  '[PaymentItem/API] Done Loading PaymentItems'
);

export const failLoadingPaymentItems = createAction(
  '[PaymentItem/API] Error Loading PaymentItems',
  props<{ error: any }>()
);

export const setSelectedPaymentItem = createAction(
  '[PaymentItem/API] Set Selected PaymentItems',
  props<{ paymentItemId: string }>()
);

export const loadPaymentItems = createAction(
  '[PaymentItem/API] Load PaymentItems',
  props<{ paymentItems: PaymentItem[] }>()
);

export const addPaymentItem = createAction(
  '[PaymentItem/API] Add PaymentItem',
  props<{ paymentItem: PaymentItem }>()
);

export const upsertPaymentItem = createAction(
  '[PaymentItem/API] Upsert PaymentItem',
  props<{ paymentItem: PaymentItem }>()
);

export const addPaymentItems = createAction(
  '[PaymentItem/API] Add PaymentItems',
  props<{ paymentItems: PaymentItem[] }>()
);

export const upsertPaymentItems = createAction(
  '[PaymentItem/API] Upsert PaymentItems',
  props<{ paymentItems: PaymentItem[] }>()
);

export const updatePaymentItem = createAction(
  '[PaymentItem/API] Update PaymentItem',
  props<{ paymentItem: Update<PaymentItem> }>()
);

export const updatePaymentItems = createAction(
  '[PaymentItem/API] Update PaymentItems',
  props<{ paymentItems: Update<PaymentItem>[] }>()
);

export const deletePaymentItem = createAction(
  '[PaymentItem/API] Delete PaymentItem',
  props<{ id: string }>()
);

export const deletePaymentItems = createAction(
  '[PaymentItem/API] Delete PaymentItems',
  props<{ ids: string[] }>()
);

export const clearPaymentItems = createAction(
  '[PaymentItem/API] Clear PaymentItems'
);
