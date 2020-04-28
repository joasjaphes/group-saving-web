import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { MemberBalance } from './member-balance.model';

export const getMemberBalances = createAction(
  '[MemberBalance/API] Get MemberBalances'
);

export const doneLoadingMemberBalances = createAction(
  '[MemberBalance/API] Done Loading MemberBalances'
);

export const failLoadingMemberBalances = createAction(
  '[MemberBalance/API] Error Loading MemberBalances',
  props<{ error: any }>()
);

export const setSelectedMemberBalance = createAction(
  '[MemberBalance/API] Set Selected MemberBalances',
  props<{ memberBalanceId: string }>()
);

export const loadMemberBalances = createAction(
  '[MemberBalance/API] Load MemberBalances',
  props<{ memberBalances: MemberBalance[] }>()
);

export const addMemberBalance = createAction(
  '[MemberBalance/API] Add MemberBalance',
  props<{ memberBalance: MemberBalance }>()
);

export const upsertMemberBalance = createAction(
  '[MemberBalance/API] Upsert MemberBalance',
  props<{ memberBalance: MemberBalance }>()
);

export const addMemberBalances = createAction(
  '[MemberBalance/API] Add MemberBalances',
  props<{ memberBalances: MemberBalance[] }>()
);

export const upsertMemberBalances = createAction(
  '[MemberBalance/API] Upsert MemberBalances',
  props<{ memberBalances: MemberBalance[] }>()
);

export const updateMemberBalance = createAction(
  '[MemberBalance/API] Update MemberBalance',
  props<{ memberBalance: Update<MemberBalance> }>()
);

export const updateMemberBalances = createAction(
  '[MemberBalance/API] Update MemberBalances',
  props<{ memberBalances: Update<MemberBalance>[] }>()
);

export const deleteMemberBalance = createAction(
  '[MemberBalance/API] Delete MemberBalance',
  props<{ id: string }>()
);

export const deleteMemberBalances = createAction(
  '[MemberBalance/API] Delete MemberBalances',
  props<{ ids: string[] }>()
);

export const clearMemberBalances = createAction(
  '[MemberBalance/API] Clear MemberBalances'
);
