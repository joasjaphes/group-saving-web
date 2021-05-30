import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { SharePeriod } from './share-period.model';

export const getSharePeriods = createAction(
  '[SharePeriod/API] Get SharePeriods'
);

export const doneLoadingSharePeriods = createAction(
  '[SharePeriod/API] Done Loading SharePeriods'
);

export const failLoadingSharePeriods = createAction(
  '[SharePeriod/API] Error Loading SharePeriods',
  props<{ error: any }>()
);

export const setSelectedSharePeriod = createAction(
  '[SharePeriod/API] Set Selected SharePeriods',
  props<{ sharePeriodId: string }>()
);

export const loadSharePeriods = createAction(
  '[SharePeriod/API] Load SharePeriods',
  props<{ sharePeriods: SharePeriod[] }>()
);

export const addSharePeriod = createAction(
  '[SharePeriod/API] Add SharePeriod',
  props<{ sharePeriod: SharePeriod }>()
);

export const upsertSharePeriod = createAction(
  '[SharePeriod/API] Upsert SharePeriod',
  props<{ sharePeriod: SharePeriod }>()
);

export const addSharePeriods = createAction(
  '[SharePeriod/API] Add SharePeriods',
  props<{ sharePeriods: SharePeriod[] }>()
);

export const upsertSharePeriods = createAction(
  '[SharePeriod/API] Upsert SharePeriods',
  props<{ sharePeriods: SharePeriod[] }>()
);

export const updateSharePeriod = createAction(
  '[SharePeriod/API] Update SharePeriod',
  props<{ sharePeriod: Update<SharePeriod> }>()
);

export const updateSharePeriods = createAction(
  '[SharePeriod/API] Update SharePeriods',
  props<{ sharePeriods: Update<SharePeriod>[] }>()
);

export const deleteSharePeriod = createAction(
  '[SharePeriod/API] Delete SharePeriod',
  props<{ id: string }>()
);

export const deleteSharePeriods = createAction(
  '[SharePeriod/API] Delete SharePeriods',
  props<{ ids: string[] }>()
);

export const clearSharePeriods = createAction(
  '[SharePeriod/API] Clear SharePeriods'
);
