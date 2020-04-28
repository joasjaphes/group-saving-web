import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Fine } from './fine.model';

export const getFines = createAction(
  '[Fine/API] Get Fines'
);

export const doneLoadingFines = createAction(
  '[Fine/API] Done Loading Fines'
);

export const failLoadingFines = createAction(
  '[Fine/API] Error Loading Fines',
  props<{ error: any }>()
);

export const setSelectedFine = createAction(
  '[Fine/API] Set Selected Fines',
  props<{ fineId: string }>()
);

export const loadFines = createAction(
  '[Fine/API] Load Fines',
  props<{ fines: Fine[] }>()
);

export const addFine = createAction(
  '[Fine/API] Add Fine',
  props<{ fine: Fine }>()
);

export const upsertFine = createAction(
  '[Fine/API] Upsert Fine',
  props<{ fine: Fine }>()
);

export const addFines = createAction(
  '[Fine/API] Add Fines',
  props<{ fines: Fine[] }>()
);

export const upsertFines = createAction(
  '[Fine/API] Upsert Fines',
  props<{ fines: Fine[] }>()
);

export const updateFine = createAction(
  '[Fine/API] Update Fine',
  props<{ fine: Update<Fine> }>()
);

export const updateFines = createAction(
  '[Fine/API] Update Fines',
  props<{ fines: Update<Fine>[] }>()
);

export const deleteFine = createAction(
  '[Fine/API] Delete Fine',
  props<{ id: string }>()
);

export const deleteFines = createAction(
  '[Fine/API] Delete Fines',
  props<{ ids: string[] }>()
);

export const clearFines = createAction(
  '[Fine/API] Clear Fines'
);
