import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Group } from './group.model';
import * as GroupActions from './group.actions';

export const groupsFeatureKey = 'groups';

export interface State extends EntityState<Group> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<Group> = createEntityAdapter<Group>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(GroupActions.getGroups, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(GroupActions.doneLoadingGroups, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(GroupActions.failLoadingGroups, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(GroupActions.setSelectedGroup, ((state, action) => {
      return {...state, selected: action.groupId};
    })
  ),
  on(GroupActions.addGroup,
    (state, action) => adapter.addOne(action.group, state)
  ),
  on(GroupActions.upsertGroup,
    (state, action) => adapter.upsertOne(action.group, state)
  ),
  on(GroupActions.addGroups,
    (state, action) => adapter.addMany(action.groups, state)
  ),
  on(GroupActions.upsertGroups,
    (state, action) => adapter.upsertMany(action.groups, state)
  ),
  on(GroupActions.updateGroup,
    (state, action) => adapter.updateOne(action.group, state)
  ),
  on(GroupActions.updateGroups,
    (state, action) => adapter.updateMany(action.groups, state)
  ),
  on(GroupActions.deleteGroup,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(GroupActions.deleteGroups,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(GroupActions.loadGroups,
    (state, action) => adapter.setAll(action.groups, state)
  ),
  on(GroupActions.clearGroups,
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
