import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MemberShare } from './member-share.model';
import * as MemberShareActions from './member-share.actions';

export const memberSharesFeatureKey = 'memberShares';

export interface State extends EntityState<MemberShare> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<MemberShare> = createEntityAdapter<MemberShare>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(MemberShareActions.getMemberShares, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(MemberShareActions.doneLoadingMemberShares, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(MemberShareActions.failLoadingMemberShares, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(MemberShareActions.setSelectedMemberShare, ((state, action) => {
      return {...state, selected: action.memberShareId};
    })
  ),
  on(MemberShareActions.addMemberShare,
    (state, action) => adapter.addOne(action.memberShare, state)
  ),
  on(MemberShareActions.upsertMemberShare,
    (state, action) => adapter.upsertOne(action.memberShare, state)
  ),
  on(MemberShareActions.addMemberShares,
    (state, action) => adapter.addMany(action.memberShares, state)
  ),
  on(MemberShareActions.upsertMemberShares,
    (state, action) => adapter.upsertMany(action.memberShares, state)
  ),
  on(MemberShareActions.updateMemberShare,
    (state, action) => adapter.updateOne(action.memberShare, state)
  ),
  on(MemberShareActions.updateMemberShares,
    (state, action) => adapter.updateMany(action.memberShares, state)
  ),
  on(MemberShareActions.deleteMemberShare,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(MemberShareActions.deleteMemberShares,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(MemberShareActions.loadMemberShares,
    (state, action) => adapter.setAll(action.memberShares, state)
  ),
  on(MemberShareActions.clearMemberShares,
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
