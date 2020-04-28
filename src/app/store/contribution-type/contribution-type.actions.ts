import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ContributionType } from './contribution-type.model';

export const getContributionTypes = createAction(
  '[ContributionType/API] Get ContributionTypes'
);

export const doneLoadingContributionTypes = createAction(
  '[ContributionType/API] Done Loading ContributionTypes'
);

export const failLoadingContributionTypes = createAction(
  '[ContributionType/API] Error Loading ContributionTypes',
  props<{ error: any }>()
);

export const setSelectedContributionType = createAction(
  '[ContributionType/API] Set Selected ContributionTypes',
  props<{ contributionTypeId: string }>()
);

export const loadContributionTypes = createAction(
  '[ContributionType/API] Load ContributionTypes',
  props<{ contributionTypes: ContributionType[] }>()
);

export const addContributionType = createAction(
  '[ContributionType/API] Add ContributionType',
  props<{ contributionType: ContributionType }>()
);

export const upsertContributionType = createAction(
  '[ContributionType/API] Upsert ContributionType',
  props<{ contributionType: ContributionType }>()
);

export const addContributionTypes = createAction(
  '[ContributionType/API] Add ContributionTypes',
  props<{ contributionTypes: ContributionType[] }>()
);

export const upsertContributionTypes = createAction(
  '[ContributionType/API] Upsert ContributionTypes',
  props<{ contributionTypes: ContributionType[] }>()
);

export const updateContributionType = createAction(
  '[ContributionType/API] Update ContributionType',
  props<{ contributionType: Update<ContributionType> }>()
);

export const updateContributionTypes = createAction(
  '[ContributionType/API] Update ContributionTypes',
  props<{ contributionTypes: Update<ContributionType>[] }>()
);

export const deleteContributionType = createAction(
  '[ContributionType/API] Delete ContributionType',
  props<{ id: string }>()
);

export const deleteContributionTypes = createAction(
  '[ContributionType/API] Delete ContributionTypes',
  props<{ ids: string[] }>()
);

export const clearContributionTypes = createAction(
  '[ContributionType/API] Clear ContributionTypes'
);
