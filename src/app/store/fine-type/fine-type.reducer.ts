import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FineType } from './fine-type.model';
import * as FineTypeActions from './fine-type.actions';

export const fineTypesFeatureKey = 'fineTypes';

export interface State extends EntityState<FineType> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<FineType> = createEntityAdapter<FineType>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(FineTypeActions.getFineTypes, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(FineTypeActions.doneLoadingFineTypes, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(FineTypeActions.failLoadingFineTypes, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(FineTypeActions.setSelectedFineType, ((state, action) => {
      return {...state, selected: action.fineTypeId};
    })
  ),
  on(FineTypeActions.addFineType,
    (state, action) => adapter.addOne(action.fineType, state)
  ),
  on(FineTypeActions.upsertFineType,
    (state, action) => adapter.upsertOne(action.fineType, state)
  ),
  on(FineTypeActions.addFineTypes,
    (state, action) => adapter.addMany(action.fineTypes, state)
  ),
  on(FineTypeActions.upsertFineTypes,
    (state, action) => adapter.upsertMany(action.fineTypes, state)
  ),
  on(FineTypeActions.updateFineType,
    (state, action) => adapter.updateOne(action.fineType, state)
  ),
  on(FineTypeActions.updateFineTypes,
    (state, action) => adapter.updateMany(action.fineTypes, state)
  ),
  on(FineTypeActions.deleteFineType,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(FineTypeActions.deleteFineTypes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(FineTypeActions.loadFineTypes,
    (state, action) => adapter.setAll(action.fineTypes, state)
  ),
  on(FineTypeActions.clearFineTypes,
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
