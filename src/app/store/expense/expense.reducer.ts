import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Expense } from './expense.model';
import * as ExpenseActions from './expense.actions';

export const expensesFeatureKey = 'expenses';

export interface State extends EntityState<Expense> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<Expense> = createEntityAdapter<Expense>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(ExpenseActions.getExpenses, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(ExpenseActions.doneLoadingExpenses, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(ExpenseActions.failLoadingExpenses, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(ExpenseActions.setSelectedExpense, ((state, action) => {
      return {...state, selected: action.expenseId};
    })
  ),
  on(ExpenseActions.addExpense,
    (state, action) => adapter.addOne(action.expense, state)
  ),
  on(ExpenseActions.upsertExpense,
    (state, action) => adapter.upsertOne(action.expense, state)
  ),
  on(ExpenseActions.addExpenses,
    (state, action) => adapter.addMany(action.expenses, state)
  ),
  on(ExpenseActions.upsertExpenses,
    (state, action) => adapter.upsertMany(action.expenses, state)
  ),
  on(ExpenseActions.updateExpense,
    (state, action) => adapter.updateOne(action.expense, state)
  ),
  on(ExpenseActions.updateExpenses,
    (state, action) => adapter.updateMany(action.expenses, state)
  ),
  on(ExpenseActions.deleteExpense,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ExpenseActions.deleteExpenses,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ExpenseActions.loadExpenses,
    (state, action) => adapter.setAll(action.expenses, state)
  ),
  on(ExpenseActions.clearExpenses,
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
