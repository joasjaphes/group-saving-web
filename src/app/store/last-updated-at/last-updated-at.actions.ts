import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LastUpdatedAt } from './last-updated-at.model';

export const getLastUpdatedAts = createAction(
  '[LastUpdatedAt/API] Get LastUpdatedAts'
);

export const doneLoadingLastUpdatedAts = createAction(
  '[LastUpdatedAt/API] Done Loading LastUpdatedAts'
);

export const failLoadingLastUpdatedAts = createAction(
  '[LastUpdatedAt/API] Error Loading LastUpdatedAts',
  props<{ error: any }>()
);

export const setSelectedLastUpdatedAt = createAction(
  '[LastUpdatedAt/API] Set Selected LastUpdatedAts',
  props<{ lastUpdatedAtId: string }>()
);

export const loadLastUpdatedAts = createAction(
  '[LastUpdatedAt/API] Load LastUpdatedAts',
  props<{ lastUpdatedAts: LastUpdatedAt[] }>()
);

export const addLastUpdatedAt = createAction(
  '[LastUpdatedAt/API] Add LastUpdatedAt',
  props<{ lastUpdatedAt: LastUpdatedAt }>()
);

export const upsertLastUpdatedAt = createAction(
  '[LastUpdatedAt/API] Upsert LastUpdatedAt',
  props<{ lastUpdatedAt: LastUpdatedAt }>()
);

export const addLastUpdatedAts = createAction(
  '[LastUpdatedAt/API] Add LastUpdatedAts',
  props<{ lastUpdatedAts: LastUpdatedAt[] }>()
);

export const upsertLastUpdatedAts = createAction(
  '[LastUpdatedAt/API] Upsert LastUpdatedAts',
  props<{ lastUpdatedAts: LastUpdatedAt[] }>()
);

export const updateLastUpdatedAt = createAction(
  '[LastUpdatedAt/API] Update LastUpdatedAt',
  props<{ lastUpdatedAt: Update<LastUpdatedAt> }>()
);

export const updateLastUpdatedAts = createAction(
  '[LastUpdatedAt/API] Update LastUpdatedAts',
  props<{ lastUpdatedAts: Update<LastUpdatedAt>[] }>()
);

export const deleteLastUpdatedAt = createAction(
  '[LastUpdatedAt/API] Delete LastUpdatedAt',
  props<{ id: string }>()
);

export const deleteLastUpdatedAts = createAction(
  '[LastUpdatedAt/API] Delete LastUpdatedAts',
  props<{ ids: string[] }>()
);

export const clearLastUpdatedAts = createAction(
  '[LastUpdatedAt/API] Clear LastUpdatedAts'
);
