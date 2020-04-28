import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { BuyingInvestmentType } from './buying-investment-type.model';

export const getBuyingInvestmentTypes = createAction(
  '[BuyingInvestmentType/API] Get BuyingInvestmentTypes'
);

export const doneLoadingBuyingInvestmentTypes = createAction(
  '[BuyingInvestmentType/API] Done Loading BuyingInvestmentTypes'
);

export const failLoadingBuyingInvestmentTypes = createAction(
  '[BuyingInvestmentType/API] Error Loading BuyingInvestmentTypes',
  props<{ error: any }>()
);

export const setSelectedBuyingInvestmentType = createAction(
  '[BuyingInvestmentType/API] Set Selected BuyingInvestmentTypes',
  props<{ buyingInvestmentTypeId: string }>()
);

export const loadBuyingInvestmentTypes = createAction(
  '[BuyingInvestmentType/API] Load BuyingInvestmentTypes',
  props<{ buyingInvestmentTypes: BuyingInvestmentType[] }>()
);

export const addBuyingInvestmentType = createAction(
  '[BuyingInvestmentType/API] Add BuyingInvestmentType',
  props<{ buyingInvestmentType: BuyingInvestmentType }>()
);

export const upsertBuyingInvestmentType = createAction(
  '[BuyingInvestmentType/API] Upsert BuyingInvestmentType',
  props<{ buyingInvestmentType: BuyingInvestmentType }>()
);

export const addBuyingInvestmentTypes = createAction(
  '[BuyingInvestmentType/API] Add BuyingInvestmentTypes',
  props<{ buyingInvestmentTypes: BuyingInvestmentType[] }>()
);

export const upsertBuyingInvestmentTypes = createAction(
  '[BuyingInvestmentType/API] Upsert BuyingInvestmentTypes',
  props<{ buyingInvestmentTypes: BuyingInvestmentType[] }>()
);

export const updateBuyingInvestmentType = createAction(
  '[BuyingInvestmentType/API] Update BuyingInvestmentType',
  props<{ buyingInvestmentType: Update<BuyingInvestmentType> }>()
);

export const updateBuyingInvestmentTypes = createAction(
  '[BuyingInvestmentType/API] Update BuyingInvestmentTypes',
  props<{ buyingInvestmentTypes: Update<BuyingInvestmentType>[] }>()
);

export const deleteBuyingInvestmentType = createAction(
  '[BuyingInvestmentType/API] Delete BuyingInvestmentType',
  props<{ id: string }>()
);

export const deleteBuyingInvestmentTypes = createAction(
  '[BuyingInvestmentType/API] Delete BuyingInvestmentTypes',
  props<{ ids: string[] }>()
);

export const clearBuyingInvestmentTypes = createAction(
  '[BuyingInvestmentType/API] Clear BuyingInvestmentTypes'
);
