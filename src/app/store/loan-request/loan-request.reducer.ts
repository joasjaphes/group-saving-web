import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LoanRequest } from './loan-request.model';
import * as LoanRequestActions from './loan-request.actions';

export const loanRequestsFeatureKey = 'loanRequests';

export interface State extends EntityState<LoanRequest> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<LoanRequest> = createEntityAdapter<LoanRequest>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(LoanRequestActions.getLoanRequests, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(LoanRequestActions.doneLoadingLoanRequests, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(LoanRequestActions.failLoadingLoanRequests, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(LoanRequestActions.setSelectedLoanRequest, ((state, action) => {
      return {...state, selected: action.loanRequestId};
    })
  ),
  on(LoanRequestActions.addLoanRequest,
    (state, action) => adapter.addOne(action.loanRequest, state)
  ),
  on(LoanRequestActions.upsertLoanRequest,
    (state, action) => adapter.upsertOne(action.loanRequest, state)
  ),
  on(LoanRequestActions.addLoanRequests,
    (state, action) => adapter.addMany(action.loanRequests, state)
  ),
  on(LoanRequestActions.upsertLoanRequests,
    (state, action) => adapter.upsertMany(action.loanRequests, state)
  ),
  on(LoanRequestActions.updateLoanRequest,
    (state, action) => adapter.updateOne(action.loanRequest, state)
  ),
  on(LoanRequestActions.updateLoanRequests,
    (state, action) => adapter.updateMany(action.loanRequests, state)
  ),
  on(LoanRequestActions.deleteLoanRequest,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LoanRequestActions.deleteLoanRequests,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LoanRequestActions.loadLoanRequests,
    (state, action) => adapter.setAll(action.loanRequests, state)
  ),
  on(LoanRequestActions.clearLoanRequests,
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
