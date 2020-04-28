import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LongTermInvestmentItem } from './long-term-investment-item.model';

export const getLongTermInvestmentItems = createAction(
  '[LongTermInvestmentItem/API] Get LongTermInvestmentItems'
);

export const doneLoadingLongTermInvestmentItems = createAction(
  '[LongTermInvestmentItem/API] Done Loading LongTermInvestmentItems'
);

export const failLoadingLongTermInvestmentItems = createAction(
  '[LongTermInvestmentItem/API] Error Loading LongTermInvestmentItems',
  props<{ error: any }>()
);

export const setSelectedLongTermInvestmentItem = createAction(
  '[LongTermInvestmentItem/API] Set Selected LongTermInvestmentItems',
  props<{ longTermInvestmentItemId: string }>()
);

export const loadLongTermInvestmentItems = createAction(
  '[LongTermInvestmentItem/API] Load LongTermInvestmentItems',
  props<{ longTermInvestmentItems: LongTermInvestmentItem[] }>()
);

export const addLongTermInvestmentItem = createAction(
  '[LongTermInvestmentItem/API] Add LongTermInvestmentItem',
  props<{ longTermInvestmentItem: LongTermInvestmentItem }>()
);

export const upsertLongTermInvestmentItem = createAction(
  '[LongTermInvestmentItem/API] Upsert LongTermInvestmentItem',
  props<{ longTermInvestmentItem: LongTermInvestmentItem }>()
);

export const addLongTermInvestmentItems = createAction(
  '[LongTermInvestmentItem/API] Add LongTermInvestmentItems',
  props<{ longTermInvestmentItems: LongTermInvestmentItem[] }>()
);

export const upsertLongTermInvestmentItems = createAction(
  '[LongTermInvestmentItem/API] Upsert LongTermInvestmentItems',
  props<{ longTermInvestmentItems: LongTermInvestmentItem[] }>()
);

export const updateLongTermInvestmentItem = createAction(
  '[LongTermInvestmentItem/API] Update LongTermInvestmentItem',
  props<{ longTermInvestmentItem: Update<LongTermInvestmentItem> }>()
);

export const updateLongTermInvestmentItems = createAction(
  '[LongTermInvestmentItem/API] Update LongTermInvestmentItems',
  props<{ longTermInvestmentItems: Update<LongTermInvestmentItem>[] }>()
);

export const deleteLongTermInvestmentItem = createAction(
  '[LongTermInvestmentItem/API] Delete LongTermInvestmentItem',
  props<{ id: string }>()
);

export const deleteLongTermInvestmentItems = createAction(
  '[LongTermInvestmentItem/API] Delete LongTermInvestmentItems',
  props<{ ids: string[] }>()
);

export const clearLongTermInvestmentItems = createAction(
  '[LongTermInvestmentItem/API] Clear LongTermInvestmentItems'
);
