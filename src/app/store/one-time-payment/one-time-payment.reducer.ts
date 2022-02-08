import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ExpenseType } from './one-time-payment.model';
import * as ExpenseTypeActions from './one-time-payment.actions';

export const expenseTypesFeatureKey = 'expenseTypes';

export interface State extends EntityState<ExpenseType> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<ExpenseType> = createEntityAdapter<ExpenseType>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(ExpenseTypeActions.getExpenseTypes, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(ExpenseTypeActions.doneLoadingExpenseTypes, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(ExpenseTypeActions.failLoadingExpenseTypes, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(ExpenseTypeActions.setSelectedExpenseType, ((state, action) => {
      return {...state, selected: action.expenseTypeId};
    })
  ),
  on(ExpenseTypeActions.addExpenseType,
    (state, action) => adapter.addOne(action.expenseType, state)
  ),
  on(ExpenseTypeActions.upsertExpenseType,
    (state, action) => adapter.upsertOne(action.expenseType, state)
  ),
  on(ExpenseTypeActions.addExpenseTypes,
    (state, action) => adapter.addMany(action.expenseTypes, state)
  ),
  on(ExpenseTypeActions.upsertExpenseTypes,
    (state, action) => adapter.upsertMany(action.expenseTypes, state)
  ),
  on(ExpenseTypeActions.updateExpenseType,
    (state, action) => adapter.updateOne(action.expenseType, state)
  ),
  on(ExpenseTypeActions.updateExpenseTypes,
    (state, action) => adapter.updateMany(action.expenseTypes, state)
  ),
  on(ExpenseTypeActions.deleteExpenseType,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ExpenseTypeActions.deleteExpenseTypes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ExpenseTypeActions.loadExpenseTypes,
    (state, action) => adapter.setAll(action.expenseTypes, state)
  ),
  on(ExpenseTypeActions.clearExpenseTypes,
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
