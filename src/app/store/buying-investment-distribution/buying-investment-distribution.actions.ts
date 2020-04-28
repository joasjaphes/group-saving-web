import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { BuyingInvestmentDistribution } from './buying-investment-distribution.model';

export const getBuyingInvestmentDistributions = createAction(
  '[BuyingInvestmentDistribution/API] Get BuyingInvestmentDistributions'
);

export const doneLoadingBuyingInvestmentDistributions = createAction(
  '[BuyingInvestmentDistribution/API] Done Loading BuyingInvestmentDistributions'
);

export const failLoadingBuyingInvestmentDistributions = createAction(
  '[BuyingInvestmentDistribution/API] Error Loading BuyingInvestmentDistributions',
  props<{ error: any }>()
);

export const setSelectedBuyingInvestmentDistribution = createAction(
  '[BuyingInvestmentDistribution/API] Set Selected BuyingInvestmentDistributions',
  props<{ buyingInvestmentDistributionId: string }>()
);

export const loadBuyingInvestmentDistributions = createAction(
  '[BuyingInvestmentDistribution/API] Load BuyingInvestmentDistributions',
  props<{ buyingInvestmentDistributions: BuyingInvestmentDistribution[] }>()
);

export const addBuyingInvestmentDistribution = createAction(
  '[BuyingInvestmentDistribution/API] Add BuyingInvestmentDistribution',
  props<{ buyingInvestmentDistribution: BuyingInvestmentDistribution }>()
);

export const upsertBuyingInvestmentDistribution = createAction(
  '[BuyingInvestmentDistribution/API] Upsert BuyingInvestmentDistribution',
  props<{ buyingInvestmentDistribution: BuyingInvestmentDistribution }>()
);

export const addBuyingInvestmentDistributions = createAction(
  '[BuyingInvestmentDistribution/API] Add BuyingInvestmentDistributions',
  props<{ buyingInvestmentDistributions: BuyingInvestmentDistribution[] }>()
);

export const upsertBuyingInvestmentDistributions = createAction(
  '[BuyingInvestmentDistribution/API] Upsert BuyingInvestmentDistributions',
  props<{ buyingInvestmentDistributions: BuyingInvestmentDistribution[] }>()
);

export const updateBuyingInvestmentDistribution = createAction(
  '[BuyingInvestmentDistribution/API] Update BuyingInvestmentDistribution',
  props<{ buyingInvestmentDistribution: Update<BuyingInvestmentDistribution> }>()
);

export const updateBuyingInvestmentDistributions = createAction(
  '[BuyingInvestmentDistribution/API] Update BuyingInvestmentDistributions',
  props<{ buyingInvestmentDistributions: Update<BuyingInvestmentDistribution>[] }>()
);

export const deleteBuyingInvestmentDistribution = createAction(
  '[BuyingInvestmentDistribution/API] Delete BuyingInvestmentDistribution',
  props<{ id: string }>()
);

export const deleteBuyingInvestmentDistributions = createAction(
  '[BuyingInvestmentDistribution/API] Delete BuyingInvestmentDistributions',
  props<{ ids: string[] }>()
);

export const clearBuyingInvestmentDistributions = createAction(
  '[BuyingInvestmentDistribution/API] Clear BuyingInvestmentDistributions'
);
