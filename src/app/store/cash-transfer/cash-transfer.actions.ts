import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CashTransfer } from './cash-transfer.model';

export const getCashTransfers = createAction(
  '[CashTransfer/API] Get CashTransfers'
);

export const doneLoadingCashTransfers = createAction(
  '[CashTransfer/API] Done Loading CashTransfers'
);

export const failLoadingCashTransfers = createAction(
  '[CashTransfer/API] Error Loading CashTransfers',
  props<{ error: any }>()
);

export const setSelectedCashTransfer = createAction(
  '[CashTransfer/API] Set Selected CashTransfers',
  props<{ cashTransferId: string }>()
);

export const loadCashTransfers = createAction(
  '[CashTransfer/API] Load CashTransfers',
  props<{ cashTransfers: CashTransfer[] }>()
);

export const addCashTransfer = createAction(
  '[CashTransfer/API] Add CashTransfer',
  props<{ cashTransfer: CashTransfer }>()
);

export const upsertCashTransfer = createAction(
  '[CashTransfer/API] Upsert CashTransfer',
  props<{ cashTransfer: CashTransfer }>()
);

export const addCashTransfers = createAction(
  '[CashTransfer/API] Add CashTransfers',
  props<{ cashTransfers: CashTransfer[] }>()
);

export const upsertCashTransfers = createAction(
  '[CashTransfer/API] Upsert CashTransfers',
  props<{ cashTransfers: CashTransfer[] }>()
);

export const updateCashTransfer = createAction(
  '[CashTransfer/API] Update CashTransfer',
  props<{ cashTransfer: Update<CashTransfer> }>()
);

export const updateCashTransfers = createAction(
  '[CashTransfer/API] Update CashTransfers',
  props<{ cashTransfers: Update<CashTransfer>[] }>()
);

export const deleteCashTransfer = createAction(
  '[CashTransfer/API] Delete CashTransfer',
  props<{ id: string }>()
);

export const deleteCashTransfers = createAction(
  '[CashTransfer/API] Delete CashTransfers',
  props<{ ids: string[] }>()
);

export const clearCashTransfers = createAction(
  '[CashTransfer/API] Clear CashTransfers'
);
