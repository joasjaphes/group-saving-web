import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShareDividendMember } from './share-dividend-member.model';
import * as ShareDividendMemberActions from './share-dividend-member.actions';

export const shareDividendMembersFeatureKey = 'shareDividendMembers';

export interface State extends EntityState<ShareDividendMember> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<ShareDividendMember> = createEntityAdapter<ShareDividendMember>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(ShareDividendMemberActions.getShareDividendMembers, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(ShareDividendMemberActions.doneLoadingShareDividendMembers, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(ShareDividendMemberActions.failLoadingShareDividendMembers, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(ShareDividendMemberActions.setSelectedShareDividendMember, ((state, action) => {
      return {...state, selected: action.shareDividendMemberId};
    })
  ),
  on(ShareDividendMemberActions.addShareDividendMember,
    (state, action) => adapter.addOne(action.shareDividendMember, state)
  ),
  on(ShareDividendMemberActions.upsertShareDividendMember,
    (state, action) => adapter.upsertOne(action.shareDividendMember, state)
  ),
  on(ShareDividendMemberActions.addShareDividendMembers,
    (state, action) => adapter.addMany(action.shareDividendMembers, state)
  ),
  on(ShareDividendMemberActions.upsertShareDividendMembers,
    (state, action) => adapter.upsertMany(action.shareDividendMembers, state)
  ),
  on(ShareDividendMemberActions.updateShareDividendMember,
    (state, action) => adapter.updateOne(action.shareDividendMember, state)
  ),
  on(ShareDividendMemberActions.updateShareDividendMembers,
    (state, action) => adapter.updateMany(action.shareDividendMembers, state)
  ),
  on(ShareDividendMemberActions.deleteShareDividendMember,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ShareDividendMemberActions.deleteShareDividendMembers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ShareDividendMemberActions.loadShareDividendMembers,
    (state, action) => adapter.setAll(action.shareDividendMembers, state)
  ),
  on(ShareDividendMemberActions.clearShareDividendMembers,
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
