import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Adjustment } from './adjustment.model';

export const getAdjustments = createAction(
  '[Adjustment/API] Get Adjustments'
);

export const doneLoadingAdjustments = createAction(
  '[Adjustment/API] Done Loading Adjustments'
);

export const failLoadingAdjustments = createAction(
  '[Adjustment/API] Error Loading Adjustments',
  props<{ error: any }>()
);

export const setSelectedAdjustment = createAction(
  '[Adjustment/API] Set Selected Adjustments',
  props<{ adjustmentId: string }>()
);

export const loadAdjustments = createAction(
  '[Adjustment/API] Load Adjustments',
  props<{ adjustments: Adjustment[] }>()
);

export const addAdjustment = createAction(
  '[Adjustment/API] Add Adjustment',
  props<{ adjustment: Adjustment }>()
);

export const upsertAdjustment = createAction(
  '[Adjustment/API] Upsert Adjustment',
  props<{ adjustment: Adjustment }>()
);

export const addAdjustments = createAction(
  '[Adjustment/API] Add Adjustments',
  props<{ adjustments: Adjustment[] }>()
);

export const upsertAdjustments = createAction(
  '[Adjustment/API] Upsert Adjustments',
  props<{ adjustments: Adjustment[] }>()
);

export const updateAdjustment = createAction(
  '[Adjustment/API] Update Adjustment',
  props<{ adjustment: Update<Adjustment> }>()
);

export const updateAdjustments = createAction(
  '[Adjustment/API] Update Adjustments',
  props<{ adjustments: Update<Adjustment>[] }>()
);

export const deleteAdjustment = createAction(
  '[Adjustment/API] Delete Adjustment',
  props<{ id: string }>()
);

export const deleteAdjustments = createAction(
  '[Adjustment/API] Delete Adjustments',
  props<{ ids: string[] }>()
);

export const clearAdjustments = createAction(
  '[Adjustment/API] Clear Adjustments'
);
