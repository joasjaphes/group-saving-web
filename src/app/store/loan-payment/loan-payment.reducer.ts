import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LoanPayment } from './loan-payment.model';
import * as LoanPaymentActions from './loan-payment.actions';

export const loanPaymentsFeatureKey = 'loanPayments';

export interface State extends EntityState<LoanPayment> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<LoanPayment> = createEntityAdapter<LoanPayment>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(LoanPaymentActions.getLoanPayments, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(LoanPaymentActions.doneLoadingLoanPayments, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(LoanPaymentActions.failLoadingLoanPayments, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(LoanPaymentActions.setSelectedLoanPayment, ((state, action) => {
      return {...state, selected: action.loanPaymentId};
    })
  ),
  on(LoanPaymentActions.addLoanPayment,
    (state, action) => adapter.addOne(action.loanPayment, state)
  ),
  on(LoanPaymentActions.upsertLoanPayment,
    (state, action) => adapter.upsertOne(action.loanPayment, state)
  ),
  on(LoanPaymentActions.addLoanPayments,
    (state, action) => adapter.addMany(action.loanPayments, state)
  ),
  on(LoanPaymentActions.upsertLoanPayments,
    (state, action) => adapter.upsertMany(action.loanPayments, state)
  ),
  on(LoanPaymentActions.updateLoanPayment,
    (state, action) => adapter.updateOne(action.loanPayment, state)
  ),
  on(LoanPaymentActions.updateLoanPayments,
    (state, action) => adapter.updateMany(action.loanPayments, state)
  ),
  on(LoanPaymentActions.deleteLoanPayment,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LoanPaymentActions.deleteLoanPayments,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LoanPaymentActions.loadLoanPayments,
    (state, action) => adapter.setAll(action.loanPayments, state)
  ),
  on(LoanPaymentActions.clearLoanPayments,
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
