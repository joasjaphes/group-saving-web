import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Fine } from './fine.model';
import * as FineActions from './fine.actions';

export const finesFeatureKey = 'fines';

export interface State extends EntityState<Fine> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<Fine> = createEntityAdapter<Fine>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(FineActions.getFines, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(FineActions.doneLoadingFines, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(FineActions.failLoadingFines, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(FineActions.setSelectedFine, ((state, action) => {
      return {...state, selected: action.fineId};
    })
  ),
  on(FineActions.addFine,
    (state, action) => adapter.addOne(action.fine, state)
  ),
  on(FineActions.upsertFine,
    (state, action) => adapter.upsertOne(action.fine, state)
  ),
  on(FineActions.addFines,
    (state, action) => adapter.addMany(action.fines, state)
  ),
  on(FineActions.upsertFines,
    (state, action) => adapter.upsertMany(action.fines, state)
  ),
  on(FineActions.updateFine,
    (state, action) => adapter.updateOne(action.fine, state)
  ),
  on(FineActions.updateFines,
    (state, action) => adapter.updateMany(action.fines, state)
  ),
  on(FineActions.deleteFine,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(FineActions.deleteFines,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(FineActions.loadFines,
    (state, action) => adapter.setAll(action.fines, state)
  ),
  on(FineActions.clearFines,
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
