import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { MemberShare } from './member-share.model';

export const getMemberShares = createAction(
  '[MemberShare/API] Get MemberShares'
);

export const doneLoadingMemberShares = createAction(
  '[MemberShare/API] Done Loading MemberShares'
);

export const failLoadingMemberShares = createAction(
  '[MemberShare/API] Error Loading MemberShares',
  props<{ error: any }>()
);

export const setSelectedMemberShare = createAction(
  '[MemberShare/API] Set Selected MemberShares',
  props<{ memberShareId: string }>()
);

export const loadMemberShares = createAction(
  '[MemberShare/API] Load MemberShares',
  props<{ memberShares: MemberShare[] }>()
);

export const addMemberShare = createAction(
  '[MemberShare/API] Add MemberShare',
  props<{ memberShare: MemberShare }>()
);

export const upsertMemberShare = createAction(
  '[MemberShare/API] Upsert MemberShare',
  props<{ memberShare: MemberShare }>()
);

export const addMemberShares = createAction(
  '[MemberShare/API] Add MemberShares',
  props<{ memberShares: MemberShare[] }>()
);

export const upsertMemberShares = createAction(
  '[MemberShare/API] Upsert MemberShares',
  props<{ memberShares: MemberShare[] }>()
);

export const updateMemberShare = createAction(
  '[MemberShare/API] Update MemberShare',
  props<{ memberShare: Update<MemberShare> }>()
);

export const updateMemberShares = createAction(
  '[MemberShare/API] Update MemberShares',
  props<{ memberShares: Update<MemberShare>[] }>()
);

export const deleteMemberShare = createAction(
  '[MemberShare/API] Delete MemberShare',
  props<{ id: string }>()
);

export const deleteMemberShares = createAction(
  '[MemberShare/API] Delete MemberShares',
  props<{ ids: string[] }>()
);

export const clearMemberShares = createAction(
  '[MemberShare/API] Clear MemberShares'
);
