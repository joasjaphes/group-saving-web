import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Member } from './member.model';

export const getMembers = createAction(
  '[Member/API] Get Members'
);

export const doneLoadingMembers = createAction(
  '[Member/API] Done Loading Members'
);

export const failLoadingMembers = createAction(
  '[Member/API] Error Loading Members',
  props<{ error: any }>()
);

export const setSelectedMember = createAction(
  '[Member/API] Set Selected Members',
  props<{ memberId: string }>()
);

export const loadMembers = createAction(
  '[Member/API] Load Members',
  props<{ members: Member[] }>()
);

export const addMember = createAction(
  '[Member/API] Add Member',
  props<{ member: Member }>()
);

export const upsertMember = createAction(
  '[Member/API] Upsert Member',
  props<{ member: Member }>()
);

export const addMembers = createAction(
  '[Member/API] Add Members',
  props<{ members: Member[] }>()
);

export const upsertMembers = createAction(
  '[Member/API] Upsert Members',
  props<{ members: Member[] }>()
);

export const updateMember = createAction(
  '[Member/API] Update Member',
  props<{ member: Update<Member> }>()
);

export const updateMembers = createAction(
  '[Member/API] Update Members',
  props<{ members: Update<Member>[] }>()
);

export const deleteMember = createAction(
  '[Member/API] Delete Member',
  props<{ id: string }>()
);

export const deleteMembers = createAction(
  '[Member/API] Delete Members',
  props<{ ids: string[] }>()
);

export const clearMembers = createAction(
  '[Member/API] Clear Members'
);
