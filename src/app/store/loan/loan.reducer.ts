import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Loan } from './loan.model';
import * as LoanActions from './loan.actions';

export const loansFeatureKey = 'loans';

export interface State extends EntityState<Loan> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<Loan> = createEntityAdapter<Loan>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(LoanActions.getLoans, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(LoanActions.doneLoadingLoans, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(LoanActions.failLoadingLoans, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(LoanActions.setSelectedLoan, ((state, action) => {
      return {...state, selected: action.loanId};
    })
  ),
  on(LoanActions.addLoan,
    (state, action) => adapter.addOne(action.loan, state)
  ),
  on(LoanActions.upsertLoan,
    (state, action) => adapter.upsertOne(action.loan, state)
  ),
  on(LoanActions.addLoans,
    (state, action) => adapter.addMany(action.loans, state)
  ),
  on(LoanActions.upsertLoans,
    (state, action) => adapter.upsertMany(action.loans, state)
  ),
  on(LoanActions.updateLoan,
    (state, action) => adapter.updateOne(action.loan, state)
  ),
  on(LoanActions.updateLoans,
    (state, action) => adapter.updateMany(action.loans, state)
  ),
  on(LoanActions.deleteLoan,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LoanActions.deleteLoans,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LoanActions.loadLoans,
    (state, action) => adapter.setAll(action.loans, state)
  ),
  on(LoanActions.clearLoans,
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
