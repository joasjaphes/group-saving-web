import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CashTransfer } from './cash-transfer.model';
import * as CashTransferActions from './cash-transfer.actions';

export const cashTransfersFeatureKey = 'cashTransfers';

export interface State extends EntityState<CashTransfer> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<CashTransfer> = createEntityAdapter<CashTransfer>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(CashTransferActions.getCashTransfers, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(CashTransferActions.doneLoadingCashTransfers, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(CashTransferActions.failLoadingCashTransfers, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(CashTransferActions.setSelectedCashTransfer, ((state, action) => {
      return {...state, selected: action.cashTransferId};
    })
  ),
  on(CashTransferActions.addCashTransfer,
    (state, action) => adapter.addOne(action.cashTransfer, state)
  ),
  on(CashTransferActions.upsertCashTransfer,
    (state, action) => adapter.upsertOne(action.cashTransfer, state)
  ),
  on(CashTransferActions.addCashTransfers,
    (state, action) => adapter.addMany(action.cashTransfers, state)
  ),
  on(CashTransferActions.upsertCashTransfers,
    (state, action) => adapter.upsertMany(action.cashTransfers, state)
  ),
  on(CashTransferActions.updateCashTransfer,
    (state, action) => adapter.updateOne(action.cashTransfer, state)
  ),
  on(CashTransferActions.updateCashTransfers,
    (state, action) => adapter.updateMany(action.cashTransfers, state)
  ),
  on(CashTransferActions.deleteCashTransfer,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CashTransferActions.deleteCashTransfers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CashTransferActions.loadCashTransfers,
    (state, action) => adapter.setAll(action.cashTransfers, state)
  ),
  on(CashTransferActions.clearCashTransfers,
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
