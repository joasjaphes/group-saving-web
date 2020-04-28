import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { BuyingInvestmentItem } from './buying-investment-item.model';

export const getBuyingInvestmentItems = createAction(
  '[BuyingInvestmentItem/API] Get BuyingInvestmentItems'
);

export const doneLoadingBuyingInvestmentItems = createAction(
  '[BuyingInvestmentItem/API] Done Loading BuyingInvestmentItems'
);

export const failLoadingBuyingInvestmentItems = createAction(
  '[BuyingInvestmentItem/API] Error Loading BuyingInvestmentItems',
  props<{ error: any }>()
);

export const setSelectedBuyingInvestmentItem = createAction(
  '[BuyingInvestmentItem/API] Set Selected BuyingInvestmentItems',
  props<{ buyingInvestmentItemId: string }>()
);

export const loadBuyingInvestmentItems = createAction(
  '[BuyingInvestmentItem/API] Load BuyingInvestmentItems',
  props<{ buyingInvestmentItems: BuyingInvestmentItem[] }>()
);

export const addBuyingInvestmentItem = createAction(
  '[BuyingInvestmentItem/API] Add BuyingInvestmentItem',
  props<{ buyingInvestmentItem: BuyingInvestmentItem }>()
);

export const upsertBuyingInvestmentItem = createAction(
  '[BuyingInvestmentItem/API] Upsert BuyingInvestmentItem',
  props<{ buyingInvestmentItem: BuyingInvestmentItem }>()
);

export const addBuyingInvestmentItems = createAction(
  '[BuyingInvestmentItem/API] Add BuyingInvestmentItems',
  props<{ buyingInvestmentItems: BuyingInvestmentItem[] }>()
);

export const upsertBuyingInvestmentItems = createAction(
  '[BuyingInvestmentItem/API] Upsert BuyingInvestmentItems',
  props<{ buyingInvestmentItems: BuyingInvestmentItem[] }>()
);

export const updateBuyingInvestmentItem = createAction(
  '[BuyingInvestmentItem/API] Update BuyingInvestmentItem',
  props<{ buyingInvestmentItem: Update<BuyingInvestmentItem> }>()
);

export const updateBuyingInvestmentItems = createAction(
  '[BuyingInvestmentItem/API] Update BuyingInvestmentItems',
  props<{ buyingInvestmentItems: Update<BuyingInvestmentItem>[] }>()
);

export const deleteBuyingInvestmentItem = createAction(
  '[BuyingInvestmentItem/API] Delete BuyingInvestmentItem',
  props<{ id: string }>()
);

export const deleteBuyingInvestmentItems = createAction(
  '[BuyingInvestmentItem/API] Delete BuyingInvestmentItems',
  props<{ ids: string[] }>()
);

export const clearBuyingInvestmentItems = createAction(
  '[BuyingInvestmentItem/API] Clear BuyingInvestmentItems'
);
