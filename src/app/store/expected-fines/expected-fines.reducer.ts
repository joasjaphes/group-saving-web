import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ExpectedFine } from './expected-fines.model';
import * as ExpectedFineActions from './expected-fines.actions';

export const expectedFinesFeatureKey = 'expectedFines';

export interface State extends EntityState<ExpectedFine> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<ExpectedFine> = createEntityAdapter<ExpectedFine>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(ExpectedFineActions.getExpectedFines, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(ExpectedFineActions.doneLoadingExpectedFines, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(ExpectedFineActions.failLoadingExpectedFines, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(ExpectedFineActions.setSelectedExpectedFine, ((state, action) => {
      return {...state, selected: action.expectedFineId};
    })
  ),
  on(ExpectedFineActions.addExpectedFine,
    (state, action) => adapter.addOne(action.expectedFine, state)
  ),
  on(ExpectedFineActions.upsertExpectedFine,
    (state, action) => adapter.upsertOne(action.expectedFine, state)
  ),
  on(ExpectedFineActions.addExpectedFines,
    (state, action) => adapter.addMany(action.expectedFines, state)
  ),
  on(ExpectedFineActions.upsertExpectedFines,
    (state, action) => adapter.upsertMany(action.expectedFines, state)
  ),
  on(ExpectedFineActions.updateExpectedFine,
    (state, action) => adapter.updateOne(action.expectedFine, state)
  ),
  on(ExpectedFineActions.updateExpectedFines,
    (state, action) => adapter.updateMany(action.expectedFines, state)
  ),
  on(ExpectedFineActions.deleteExpectedFine,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ExpectedFineActions.deleteExpectedFines,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ExpectedFineActions.loadExpectedFines,
    (state, action) => adapter.setAll(action.expectedFines, state)
  ),
  on(ExpectedFineActions.clearExpectedFines,
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
