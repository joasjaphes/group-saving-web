import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ShareDividendMember } from './share-dividend-member.model';

export const getShareDividendMembers = createAction(
  '[ShareDividendMember/API] Get ShareDividendMembers'
);

export const doneLoadingShareDividendMembers = createAction(
  '[ShareDividendMember/API] Done Loading ShareDividendMembers'
);

export const failLoadingShareDividendMembers = createAction(
  '[ShareDividendMember/API] Error Loading ShareDividendMembers',
  props<{ error: any }>()
);

export const setSelectedShareDividendMember = createAction(
  '[ShareDividendMember/API] Set Selected ShareDividendMembers',
  props<{ shareDividendMemberId: string }>()
);

export const loadShareDividendMembers = createAction(
  '[ShareDividendMember/API] Load ShareDividendMembers',
  props<{ shareDividendMembers: ShareDividendMember[] }>()
);

export const addShareDividendMember = createAction(
  '[ShareDividendMember/API] Add ShareDividendMember',
  props<{ shareDividendMember: ShareDividendMember }>()
);

export const upsertShareDividendMember = createAction(
  '[ShareDividendMember/API] Upsert ShareDividendMember',
  props<{ shareDividendMember: ShareDividendMember }>()
);

export const addShareDividendMembers = createAction(
  '[ShareDividendMember/API] Add ShareDividendMembers',
  props<{ shareDividendMembers: ShareDividendMember[] }>()
);

export const upsertShareDividendMembers = createAction(
  '[ShareDividendMember/API] Upsert ShareDividendMembers',
  props<{ shareDividendMembers: ShareDividendMember[] }>()
);

export const updateShareDividendMember = createAction(
  '[ShareDividendMember/API] Update ShareDividendMember',
  props<{ shareDividendMember: Update<ShareDividendMember> }>()
);

export const updateShareDividendMembers = createAction(
  '[ShareDividendMember/API] Update ShareDividendMembers',
  props<{ shareDividendMembers: Update<ShareDividendMember>[] }>()
);

export const deleteShareDividendMember = createAction(
  '[ShareDividendMember/API] Delete ShareDividendMember',
  props<{ id: string }>()
);

export const deleteShareDividendMembers = createAction(
  '[ShareDividendMember/API] Delete ShareDividendMembers',
  props<{ ids: string[] }>()
);

export const clearShareDividendMembers = createAction(
  '[ShareDividendMember/API] Clear ShareDividendMembers'
);
