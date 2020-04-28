import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LoanType } from './loan-type.model';
import * as LoanTypeActions from './loan-type.actions';

export const loanTypesFeatureKey = 'loanTypes';

export interface State extends EntityState<LoanType> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<LoanType> = createEntityAdapter<LoanType>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(LoanTypeActions.getLoanTypes, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(LoanTypeActions.doneLoadingLoanTypes, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(LoanTypeActions.failLoadingLoanTypes, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(LoanTypeActions.setSelectedLoanType, ((state, action) => {
      return {...state, selected: action.loanTypeId};
    })
  ),
  on(LoanTypeActions.addLoanType,
    (state, action) => adapter.addOne(action.loanType, state)
  ),
  on(LoanTypeActions.upsertLoanType,
    (state, action) => adapter.upsertOne(action.loanType, state)
  ),
  on(LoanTypeActions.addLoanTypes,
    (state, action) => adapter.addMany(action.loanTypes, state)
  ),
  on(LoanTypeActions.upsertLoanTypes,
    (state, action) => adapter.upsertMany(action.loanTypes, state)
  ),
  on(LoanTypeActions.updateLoanType,
    (state, action) => adapter.updateOne(action.loanType, state)
  ),
  on(LoanTypeActions.updateLoanTypes,
    (state, action) => adapter.updateMany(action.loanTypes, state)
  ),
  on(LoanTypeActions.deleteLoanType,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LoanTypeActions.deleteLoanTypes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LoanTypeActions.loadLoanTypes,
    (state, action) => adapter.setAll(action.loanTypes, state)
  ),
  on(LoanTypeActions.clearLoanTypes,
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
