import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ContributionTypeBalance } from './contribution-type-balance.model';

export const getContributionTypeBalances = createAction(
  '[ContributionTypeBalance/API] Get ContributionTypeBalances'
);

export const doneLoadingContributionTypeBalances = createAction(
  '[ContributionTypeBalance/API] Done Loading ContributionTypeBalances'
);

export const failLoadingContributionTypeBalances = createAction(
  '[ContributionTypeBalance/API] Error Loading ContributionTypeBalances',
  props<{ error: any }>()
);

export const setSelectedContributionTypeBalance = createAction(
  '[ContributionTypeBalance/API] Set Selected ContributionTypeBalances',
  props<{ contributionTypeBalanceId: string }>()
);

export const loadContributionTypeBalances = createAction(
  '[ContributionTypeBalance/API] Load ContributionTypeBalances',
  props<{ contributionTypeBalances: ContributionTypeBalance[] }>()
);

export const addContributionTypeBalance = createAction(
  '[ContributionTypeBalance/API] Add ContributionTypeBalance',
  props<{ contributionTypeBalance: ContributionTypeBalance }>()
);

export const upsertContributionTypeBalance = createAction(
  '[ContributionTypeBalance/API] Upsert ContributionTypeBalance',
  props<{ contributionTypeBalance: ContributionTypeBalance }>()
);

export const addContributionTypeBalances = createAction(
  '[ContributionTypeBalance/API] Add ContributionTypeBalances',
  props<{ contributionTypeBalances: ContributionTypeBalance[] }>()
);

export const upsertContributionTypeBalances = createAction(
  '[ContributionTypeBalance/API] Upsert ContributionTypeBalances',
  props<{ contributionTypeBalances: ContributionTypeBalance[] }>()
);

export const updateContributionTypeBalance = createAction(
  '[ContributionTypeBalance/API] Update ContributionTypeBalance',
  props<{ contributionTypeBalance: Update<ContributionTypeBalance> }>()
);

export const updateContributionTypeBalances = createAction(
  '[ContributionTypeBalance/API] Update ContributionTypeBalances',
  props<{ contributionTypeBalances: Update<ContributionTypeBalance>[] }>()
);

export const deleteContributionTypeBalance = createAction(
  '[ContributionTypeBalance/API] Delete ContributionTypeBalance',
  props<{ id: string }>()
);

export const deleteContributionTypeBalances = createAction(
  '[ContributionTypeBalance/API] Delete ContributionTypeBalances',
  props<{ ids: string[] }>()
);

export const clearContributionTypeBalances = createAction(
  '[ContributionTypeBalance/API] Clear ContributionTypeBalances'
);
