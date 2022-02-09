import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OneTimePayment } from './one-time-payment.model';
import * as OneTimePaymentActions from './one-time-payment.actions';

export const oneTimePaymentsFeatureKey = 'oneTimePayments';

export interface State extends EntityState<OneTimePayment> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<OneTimePayment> = createEntityAdapter<OneTimePayment>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(OneTimePaymentActions.getOneTimePayments, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(OneTimePaymentActions.doneLoadingOneTimePayments, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(OneTimePaymentActions.failLoadingOneTimePayments, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(OneTimePaymentActions.setSelectedOneTimePayment, ((state, action) => {
      return {...state, selected: action.oneTimePaymentId};
    })
  ),
  on(OneTimePaymentActions.addOneTimePayment,
    (state, action) => adapter.addOne(action.oneTimePayment, state)
  ),
  on(OneTimePaymentActions.upsertOneTimePayment,
    (state, action) => adapter.upsertOne(action.oneTimePayment, state)
  ),
  on(OneTimePaymentActions.addOneTimePayments,
    (state, action) => adapter.addMany(action.oneTimePayments, state)
  ),
  on(OneTimePaymentActions.upsertOneTimePayments,
    (state, action) => adapter.upsertMany(action.oneTimePayments, state)
  ),
  on(OneTimePaymentActions.updateOneTimePayment,
    (state, action) => adapter.updateOne(action.oneTimePayment, state)
  ),
  on(OneTimePaymentActions.updateOneTimePayments,
    (state, action) => adapter.updateMany(action.oneTimePayments, state)
  ),
  on(OneTimePaymentActions.deleteOneTimePayment,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(OneTimePaymentActions.deleteOneTimePayments,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(OneTimePaymentActions.loadOneTimePayments,
    (state, action) => adapter.setAll(action.oneTimePayments, state)
  ),
  on(OneTimePaymentActions.clearOneTimePayments,
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
