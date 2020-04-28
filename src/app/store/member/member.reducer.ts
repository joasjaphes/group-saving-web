import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Member } from './member.model';
import * as MemberActions from './member.actions';

export const membersFeatureKey = 'members';

export interface State extends EntityState<Member> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<Member> = createEntityAdapter<Member>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(MemberActions.getMembers, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(MemberActions.doneLoadingMembers, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(MemberActions.failLoadingMembers, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(MemberActions.setSelectedMember, ((state, action) => {
      return {...state, selected: action.memberId};
    })
  ),
  on(MemberActions.addMember,
    (state, action) => adapter.addOne(action.member, state)
  ),
  on(MemberActions.upsertMember,
    (state, action) => adapter.upsertOne(action.member, state)
  ),
  on(MemberActions.addMembers,
    (state, action) => adapter.addMany(action.members, state)
  ),
  on(MemberActions.upsertMembers,
    (state, action) => adapter.upsertMany(action.members, state)
  ),
  on(MemberActions.updateMember,
    (state, action) => adapter.updateOne(action.member, state)
  ),
  on(MemberActions.updateMembers,
    (state, action) => adapter.updateMany(action.members, state)
  ),
  on(MemberActions.deleteMember,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(MemberActions.deleteMembers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(MemberActions.loadMembers,
    (state, action) => adapter.setAll(action.members, state)
  ),
  on(MemberActions.clearMembers,
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
