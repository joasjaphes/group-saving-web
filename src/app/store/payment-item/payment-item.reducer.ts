import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PaymentItem } from './payment-item.model';
import * as PaymentItemActions from './payment-item.actions';

export const paymentItemsFeatureKey = 'paymentItems';

export interface State extends EntityState<PaymentItem> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<PaymentItem> = createEntityAdapter<PaymentItem>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(PaymentItemActions.getPaymentItems, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(PaymentItemActions.doneLoadingPaymentItems, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(PaymentItemActions.failLoadingPaymentItems, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(PaymentItemActions.setSelectedPaymentItem, ((state, action) => {
      return {...state, selected: action.paymentItemId};
    })
  ),
  on(PaymentItemActions.addPaymentItem,
    (state, action) => adapter.addOne(action.paymentItem, state)
  ),
  on(PaymentItemActions.upsertPaymentItem,
    (state, action) => adapter.upsertOne(action.paymentItem, state)
  ),
  on(PaymentItemActions.addPaymentItems,
    (state, action) => adapter.addMany(action.paymentItems, state)
  ),
  on(PaymentItemActions.upsertPaymentItems,
    (state, action) => adapter.upsertMany(action.paymentItems, state)
  ),
  on(PaymentItemActions.updatePaymentItem,
    (state, action) => adapter.updateOne(action.paymentItem, state)
  ),
  on(PaymentItemActions.updatePaymentItems,
    (state, action) => adapter.updateMany(action.paymentItems, state)
  ),
  on(PaymentItemActions.deletePaymentItem,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PaymentItemActions.deletePaymentItems,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PaymentItemActions.loadPaymentItems,
    (state, action) => adapter.setAll(action.paymentItems, state)
  ),
  on(PaymentItemActions.clearPaymentItems,
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
