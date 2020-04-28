import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { MemberGroup } from './member-group.model';

export const getMemberGroups = createAction(
  '[MemberGroup/API] Get MemberGroups'
);

export const doneLoadingMemberGroups = createAction(
  '[MemberGroup/API] Done Loading MemberGroups'
);

export const failLoadingMemberGroups = createAction(
  '[MemberGroup/API] Error Loading MemberGroups',
  props<{ error: any }>()
);

export const setSelectedMemberGroup = createAction(
  '[MemberGroup/API] Set Selected MemberGroups',
  props<{ memberGroupId: string }>()
);

export const loadMemberGroups = createAction(
  '[MemberGroup/API] Load MemberGroups',
  props<{ memberGroups: MemberGroup[] }>()
);

export const addMemberGroup = createAction(
  '[MemberGroup/API] Add MemberGroup',
  props<{ memberGroup: MemberGroup }>()
);

export const upsertMemberGroup = createAction(
  '[MemberGroup/API] Upsert MemberGroup',
  props<{ memberGroup: MemberGroup }>()
);

export const addMemberGroups = createAction(
  '[MemberGroup/API] Add MemberGroups',
  props<{ memberGroups: MemberGroup[] }>()
);

export const upsertMemberGroups = createAction(
  '[MemberGroup/API] Upsert MemberGroups',
  props<{ memberGroups: MemberGroup[] }>()
);

export const updateMemberGroup = createAction(
  '[MemberGroup/API] Update MemberGroup',
  props<{ memberGroup: Update<MemberGroup> }>()
);

export const updateMemberGroups = createAction(
  '[MemberGroup/API] Update MemberGroups',
  props<{ memberGroups: Update<MemberGroup>[] }>()
);

export const deleteMemberGroup = createAction(
  '[MemberGroup/API] Delete MemberGroup',
  props<{ id: string }>()
);

export const deleteMemberGroups = createAction(
  '[MemberGroup/API] Delete MemberGroups',
  props<{ ids: string[] }>()
);

export const clearMemberGroups = createAction(
  '[MemberGroup/API] Clear MemberGroups'
);
