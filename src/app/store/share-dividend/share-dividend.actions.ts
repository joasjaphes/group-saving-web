import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ShareDividend } from './share-dividend.model';

export const getShareDividends = createAction(
  '[ShareDividend/API] Get ShareDividends'
);

export const doneLoadingShareDividends = createAction(
  '[ShareDividend/API] Done Loading ShareDividends'
);

export const failLoadingShareDividends = createAction(
  '[ShareDividend/API] Error Loading ShareDividends',
  props<{ error: any }>()
);

export const setSelectedShareDividend = createAction(
  '[ShareDividend/API] Set Selected ShareDividends',
  props<{ shareDividendId: string }>()
);

export const loadShareDividends = createAction(
  '[ShareDividend/API] Load ShareDividends',
  props<{ shareDividends: ShareDividend[] }>()
);

export const addShareDividend = createAction(
  '[ShareDividend/API] Add ShareDividend',
  props<{ shareDividend: ShareDividend }>()
);

export const upsertShareDividend = createAction(
  '[ShareDividend/API] Upsert ShareDividend',
  props<{ shareDividend: ShareDividend }>()
);

export const addShareDividends = createAction(
  '[ShareDividend/API] Add ShareDividends',
  props<{ shareDividends: ShareDividend[] }>()
);

export const upsertShareDividends = createAction(
  '[ShareDividend/API] Upsert ShareDividends',
  props<{ shareDividends: ShareDividend[] }>()
);

export const updateShareDividend = createAction(
  '[ShareDividend/API] Update ShareDividend',
  props<{ shareDividend: Update<ShareDividend> }>()
);

export const updateShareDividends = createAction(
  '[ShareDividend/API] Update ShareDividends',
  props<{ shareDividends: Update<ShareDividend>[] }>()
);

export const deleteShareDividend = createAction(
  '[ShareDividend/API] Delete ShareDividend',
  props<{ id: string }>()
);

export const deleteShareDividends = createAction(
  '[ShareDividend/API] Delete ShareDividends',
  props<{ ids: string[] }>()
);

export const clearShareDividends = createAction(
  '[ShareDividend/API] Clear ShareDividends'
);
