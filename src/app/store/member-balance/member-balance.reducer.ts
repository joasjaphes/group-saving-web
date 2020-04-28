import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MemberBalance } from './member-balance.model';
import * as MemberBalanceActions from './member-balance.actions';

export const memberBalancesFeatureKey = 'memberBalances';

export interface State extends EntityState<MemberBalance> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<MemberBalance> = createEntityAdapter<MemberBalance>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(MemberBalanceActions.getMemberBalances, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(MemberBalanceActions.doneLoadingMemberBalances, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(MemberBalanceActions.failLoadingMemberBalances, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(MemberBalanceActions.setSelectedMemberBalance, ((state, action) => {
      return {...state, selected: action.memberBalanceId};
    })
  ),
  on(MemberBalanceActions.addMemberBalance,
    (state, action) => adapter.addOne(action.memberBalance, state)
  ),
  on(MemberBalanceActions.upsertMemberBalance,
    (state, action) => adapter.upsertOne(action.memberBalance, state)
  ),
  on(MemberBalanceActions.addMemberBalances,
    (state, action) => adapter.addMany(action.memberBalances, state)
  ),
  on(MemberBalanceActions.upsertMemberBalances,
    (state, action) => adapter.upsertMany(action.memberBalances, state)
  ),
  on(MemberBalanceActions.updateMemberBalance,
    (state, action) => adapter.updateOne(action.memberBalance, state)
  ),
  on(MemberBalanceActions.updateMemberBalances,
    (state, action) => adapter.updateMany(action.memberBalances, state)
  ),
  on(MemberBalanceActions.deleteMemberBalance,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(MemberBalanceActions.deleteMemberBalances,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(MemberBalanceActions.loadMemberBalances,
    (state, action) => adapter.setAll(action.memberBalances, state)
  ),
  on(MemberBalanceActions.clearMemberBalances,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
export const getSelectedId = (state: State) => state.selected;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getError = (state: State) => state.error;
