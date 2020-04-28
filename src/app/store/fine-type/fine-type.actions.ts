import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { FineType } from './fine-type.model';

export const getFineTypes = createAction(
  '[FineType/API] Get FineTypes'
);

export const doneLoadingFineTypes = createAction(
  '[FineType/API] Done Loading FineTypes'
);

export const failLoadingFineTypes = createAction(
  '[FineType/API] Error Loading FineTypes',
  props<{ error: any }>()
);

export const setSelectedFineType = createAction(
  '[FineType/API] Set Selected FineTypes',
  props<{ fineTypeId: string }>()
);

export const loadFineTypes = createAction(
  '[FineType/API] Load FineTypes',
  props<{ fineTypes: FineType[] }>()
);

export const addFineType = createAction(
  '[FineType/API] Add FineType',
  props<{ fineType: FineType }>()
);

export const upsertFineType = createAction(
  '[FineType/API] Upsert FineType',
  props<{ fineType: FineType }>()
);

export const addFineTypes = createAction(
  '[FineType/API] Add FineTypes',
  props<{ fineTypes: FineType[] }>()
);

export const upsertFineTypes = createAction(
  '[FineType/API] Upsert FineTypes',
  props<{ fineTypes: FineType[] }>()
);

export const updateFineType = createAction(
  '[FineType/API] Update FineType',
  props<{ fineType: Update<FineType> }>()
);

export const updateFineTypes = createAction(
  '[FineType/API] Update FineTypes',
  props<{ fineTypes: Update<FineType>[] }>()
);

export const deleteFineType = createAction(
  '[FineType/API] Delete FineType',
  props<{ id: string }>()
);

export const deleteFineTypes = createAction(
  '[FineType/API] Delete FineTypes',
  props<{ ids: string[] }>()
);

export const clearFineTypes = createAction(
  '[FineType/API] Clear FineTypes'
);
