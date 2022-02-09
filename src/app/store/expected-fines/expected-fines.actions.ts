import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ExpectedFine } from './expected-fines.model';

export const getExpectedFines = createAction(
  '[ExpectedFine/API] Get ExpectedFines'
);

export const doneLoadingExpectedFines = createAction(
  '[ExpectedFine/API] Done Loading ExpectedFines'
);

export const failLoadingExpectedFines = createAction(
  '[ExpectedFine/API] Error Loading ExpectedFines',
  props<{ error: any }>()
);

export const setSelectedExpectedFine = createAction(
  '[ExpectedFine/API] Set Selected ExpectedFines',
  props<{ expectedFineId: string }>()
);

export const loadExpectedFines = createAction(
  '[ExpectedFine/API] Load ExpectedFines',
  props<{ expectedFines: ExpectedFine[] }>()
);

export const addExpectedFine = createAction(
  '[ExpectedFine/API] Add ExpectedFine',
  props<{ expectedFine: ExpectedFine }>()
);

export const upsertExpectedFine = createAction(
  '[ExpectedFine/API] Upsert ExpectedFine',
  props<{ expectedFine: ExpectedFine }>()
);

export const addExpectedFines = createAction(
  '[ExpectedFine/API] Add ExpectedFines',
  props<{ expectedFines: ExpectedFine[] }>()
);

export const upsertExpectedFines = createAction(
  '[ExpectedFine/API] Upsert ExpectedFines',
  props<{ expectedFines: ExpectedFine[] }>()
);

export const updateExpectedFine = createAction(
  '[ExpectedFine/API] Update ExpectedFine',
  props<{ expectedFine: Update<ExpectedFine> }>()
);

export const updateExpectedFines = createAction(
  '[ExpectedFine/API] Update ExpectedFines',
  props<{ expectedFines: Update<ExpectedFine>[] }>()
);

export const deleteExpectedFine = createAction(
  '[ExpectedFine/API] Delete ExpectedFine',
  props<{ id: string }>()
);

export const deleteExpectedFines = createAction(
  '[ExpectedFine/API] Delete ExpectedFines',
  props<{ ids: string[] }>()
);

export const clearExpectedFines = createAction(
  '[ExpectedFine/API] Clear ExpectedFines'
);
