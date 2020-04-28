import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Group } from './group.model';

export const getGroups = createAction(
  '[Group/API] Get Groups'
);

export const doneLoadingGroups = createAction(
  '[Group/API] Done Loading Groups'
);

export const failLoadingGroups = createAction(
  '[Group/API] Error Loading Groups',
  props<{ error: any }>()
);

export const setSelectedGroup = createAction(
  '[Group/API] Set Selected Groups',
  props<{ groupId: string }>()
);

export const loadGroups = createAction(
  '[Group/API] Load Groups',
  props<{ groups: Group[] }>()
);

export const addGroup = createAction(
  '[Group/API] Add Group',
  props<{ group: Group }>()
);

export const upsertGroup = createAction(
  '[Group/API] Upsert Group',
  props<{ group: Group }>()
);

export const addGroups = createAction(
  '[Group/API] Add Groups',
  props<{ groups: Group[] }>()
);

export const upsertGroups = createAction(
  '[Group/API] Upsert Groups',
  props<{ groups: Group[] }>()
);

export const updateGroup = createAction(
  '[Group/API] Update Group',
  props<{ group: Update<Group> }>()
);

export const updateGroups = createAction(
  '[Group/API] Update Groups',
  props<{ groups: Update<Group>[] }>()
);

export const deleteGroup = createAction(
  '[Group/API] Delete Group',
  props<{ id: string }>()
);

export const deleteGroups = createAction(
  '[Group/API] Delete Groups',
  props<{ ids: string[] }>()
);

export const clearGroups = createAction(
  '[Group/API] Clear Groups'
);
