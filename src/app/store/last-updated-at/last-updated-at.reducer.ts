import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LastUpdatedAt } from './last-updated-at.model';
import * as LastUpdatedAtActions from './last-updated-at.actions';

export const lastUpdatedAtsFeatureKey = 'lastUpdatedAts';

export interface State extends EntityState<LastUpdatedAt> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<LastUpdatedAt> = createEntityAdapter<LastUpdatedAt>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(LastUpdatedAtActions.getLastUpdatedAts, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(LastUpdatedAtActions.doneLoadingLastUpdatedAts, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(LastUpdatedAtActions.failLoadingLastUpdatedAts, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(LastUpdatedAtActions.setSelectedLastUpdatedAt, ((state, action) => {
      return {...state, selected: action.lastUpdatedAtId};
    })
  ),
  on(LastUpdatedAtActions.addLastUpdatedAt,
    (state, action) => adapter.addOne(action.lastUpdatedAt, state)
  ),
  on(LastUpdatedAtActions.upsertLastUpdatedAt,
    (state, action) => adapter.upsertOne(action.lastUpdatedAt, state)
  ),
  on(LastUpdatedAtActions.addLastUpdatedAts,
    (state, action) => adapter.addMany(action.lastUpdatedAts, state)
  ),
  on(LastUpdatedAtActions.upsertLastUpdatedAts,
    (state, action) => adapter.upsertMany(action.lastUpdatedAts, state)
  ),
  on(LastUpdatedAtActions.updateLastUpdatedAt,
    (state, action) => adapter.updateOne(action.lastUpdatedAt, state)
  ),
  on(LastUpdatedAtActions.updateLastUpdatedAts,
    (state, action) => adapter.updateMany(action.lastUpdatedAts, state)
  ),
  on(LastUpdatedAtActions.deleteLastUpdatedAt,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LastUpdatedAtActions.deleteLastUpdatedAts,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LastUpdatedAtActions.loadLastUpdatedAts,
    (state, action) => adapter.setAll(action.lastUpdatedAts, state)
  ),
  on(LastUpdatedAtActions.clearLastUpdatedAts,
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
