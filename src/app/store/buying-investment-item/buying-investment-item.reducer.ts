import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BuyingInvestmentItem } from './buying-investment-item.model';
import * as BuyingInvestmentItemActions from './buying-investment-item.actions';

export const buyingInvestmentItemsFeatureKey = 'buyingInvestmentItems';

export interface State extends EntityState<BuyingInvestmentItem> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<BuyingInvestmentItem> = createEntityAdapter<BuyingInvestmentItem>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(BuyingInvestmentItemActions.getBuyingInvestmentItems, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(BuyingInvestmentItemActions.doneLoadingBuyingInvestmentItems, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(BuyingInvestmentItemActions.failLoadingBuyingInvestmentItems, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(BuyingInvestmentItemActions.setSelectedBuyingInvestmentItem, ((state, action) => {
      return {...state, selected: action.buyingInvestmentItemId};
    })
  ),
  on(BuyingInvestmentItemActions.addBuyingInvestmentItem,
    (state, action) => adapter.addOne(action.buyingInvestmentItem, state)
  ),
  on(BuyingInvestmentItemActions.upsertBuyingInvestmentItem,
    (state, action) => adapter.upsertOne(action.buyingInvestmentItem, state)
  ),
  on(BuyingInvestmentItemActions.addBuyingInvestmentItems,
    (state, action) => adapter.addMany(action.buyingInvestmentItems, state)
  ),
  on(BuyingInvestmentItemActions.upsertBuyingInvestmentItems,
    (state, action) => adapter.upsertMany(action.buyingInvestmentItems, state)
  ),
  on(BuyingInvestmentItemActions.updateBuyingInvestmentItem,
    (state, action) => adapter.updateOne(action.buyingInvestmentItem, state)
  ),
  on(BuyingInvestmentItemActions.updateBuyingInvestmentItems,
    (state, action) => adapter.updateMany(action.buyingInvestmentItems, state)
  ),
  on(BuyingInvestmentItemActions.deleteBuyingInvestmentItem,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(BuyingInvestmentItemActions.deleteBuyingInvestmentItems,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(BuyingInvestmentItemActions.loadBuyingInvestmentItems,
    (state, action) => adapter.setAll(action.buyingInvestmentItems, state)
  ),
  on(BuyingInvestmentItemActions.clearBuyingInvestmentItems,
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
