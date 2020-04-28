import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MemberGroup } from './member-group.model';
import * as MemberGroupActions from './member-group.actions';

export const memberGroupsFeatureKey = 'memberGroups';

export interface State extends EntityState<MemberGroup> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<MemberGroup> = createEntityAdapter<MemberGroup>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(MemberGroupActions.getMemberGroups, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(MemberGroupActions.doneLoadingMemberGroups, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(MemberGroupActions.failLoadingMemberGroups, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(MemberGroupActions.setSelectedMemberGroup, ((state, action) => {
      return {...state, selected: action.memberGroupId};
    })
  ),
  on(MemberGroupActions.addMemberGroup,
    (state, action) => adapter.addOne(action.memberGroup, state)
  ),
  on(MemberGroupActions.upsertMemberGroup,
    (state, action) => adapter.upsertOne(action.memberGroup, state)
  ),
  on(MemberGroupActions.addMemberGroups,
    (state, action) => adapter.addMany(action.memberGroups, state)
  ),
  on(MemberGroupActions.upsertMemberGroups,
    (state, action) => adapter.upsertMany(action.memberGroups, state)
  ),
  on(MemberGroupActions.updateMemberGroup,
    (state, action) => adapter.updateOne(action.memberGroup, state)
  ),
  on(MemberGroupActions.updateMemberGroups,
    (state, action) => adapter.updateMany(action.memberGroups, state)
  ),
  on(MemberGroupActions.deleteMemberGroup,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(MemberGroupActions.deleteMemberGroups,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(MemberGroupActions.loadMemberGroups,
    (state, action) => adapter.setAll(action.memberGroups, state)
  ),
  on(MemberGroupActions.clearMemberGroups,
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
