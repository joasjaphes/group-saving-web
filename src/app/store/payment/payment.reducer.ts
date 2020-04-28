import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Payment } from './payment.model';
import * as PaymentActions from './payment.actions';

export const paymentsFeatureKey = 'payments';

export interface State extends EntityState<Payment> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<Payment> = createEntityAdapter<Payment>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(PaymentActions.getPayments, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(PaymentActions.doneLoadingPayments, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(PaymentActions.failLoadingPayments, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(PaymentActions.setSelectedPayment, ((state, action) => {
      return {...state, selected: action.paymentId};
    })
  ),
  on(PaymentActions.addPayment,
    (state, action) => adapter.addOne(action.payment, state)
  ),
  on(PaymentActions.upsertPayment,
    (state, action) => adapter.upsertOne(action.payment, state)
  ),
  on(PaymentActions.addPayments,
    (state, action) => adapter.addMany(action.payments, state)
  ),
  on(PaymentActions.upsertPayments,
    (state, action) => adapter.upsertMany(action.payments, state)
  ),
  on(PaymentActions.updatePayment,
    (state, action) => adapter.updateOne(action.payment, state)
  ),
  on(PaymentActions.updatePayments,
    (state, action) => adapter.updateMany(action.payments, state)
  ),
  on(PaymentActions.deletePayment,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PaymentActions.deletePayments,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PaymentActions.loadPayments,
    (state, action) => adapter.setAll(action.payments, state)
  ),
  on(PaymentActions.clearPayments,
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
