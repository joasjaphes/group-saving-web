import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LongTermInvestmentType } from './long-term-investment-type.model';

export const getLongTermInvestmentTypes = createAction(
  '[LongTermInvestmentType/API] Get LongTermInvestmentTypes'
);

export const doneLoadingLongTermInvestmentTypes = createAction(
  '[LongTermInvestmentType/API] Done Loading LongTermInvestmentTypes'
);

export const failLoadingLongTermInvestmentTypes = createAction(
  '[LongTermInvestmentType/API] Error Loading LongTermInvestmentTypes',
  props<{ error: any }>()
);

export const setSelectedLongTermInvestmentType = createAction(
  '[LongTermInvestmentType/API] Set Selected LongTermInvestmentTypes',
  props<{ longTermInvestmentTypeId: string }>()
);

export const loadLongTermInvestmentTypes = createAction(
  '[LongTermInvestmentType/API] Load LongTermInvestmentTypes',
  props<{ longTermInvestmentTypes: LongTermInvestmentType[] }>()
);

export const addLongTermInvestmentType = createAction(
  '[LongTermInvestmentType/API] Add LongTermInvestmentType',
  props<{ longTermInvestmentType: LongTermInvestmentType }>()
);

export const upsertLongTermInvestmentType = createAction(
  '[LongTermInvestmentType/API] Upsert LongTermInvestmentType',
  props<{ longTermInvestmentType: LongTermInvestmentType }>()
);

export const addLongTermInvestmentTypes = createAction(
  '[LongTermInvestmentType/API] Add LongTermInvestmentTypes',
  props<{ longTermInvestmentTypes: LongTermInvestmentType[] }>()
);

export const upsertLongTermInvestmentTypes = createAction(
  '[LongTermInvestmentType/API] Upsert LongTermInvestmentTypes',
  props<{ longTermInvestmentTypes: LongTermInvestmentType[] }>()
);

export const updateLongTermInvestmentType = createAction(
  '[LongTermInvestmentType/API] Update LongTermInvestmentType',
  props<{ longTermInvestmentType: Update<LongTermInvestmentType> }>()
);

export const updateLongTermInvestmentTypes = createAction(
  '[LongTermInvestmentType/API] Update LongTermInvestmentTypes',
  props<{ longTermInvestmentTypes: Update<LongTermInvestmentType>[] }>()
);

export const deleteLongTermInvestmentType = createAction(
  '[LongTermInvestmentType/API] Delete LongTermInvestmentType',
  props<{ id: string }>()
);

export const deleteLongTermInvestmentTypes = createAction(
  '[LongTermInvestmentType/API] Delete LongTermInvestmentTypes',
  props<{ ids: string[] }>()
);

export const clearLongTermInvestmentTypes = createAction(
  '[LongTermInvestmentType/API] Clear LongTermInvestmentTypes'
);
