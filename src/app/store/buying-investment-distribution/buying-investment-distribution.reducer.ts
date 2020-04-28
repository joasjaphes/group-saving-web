import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BuyingInvestmentDistribution } from './buying-investment-distribution.model';
import * as BuyingInvestmentDistributionActions from './buying-investment-distribution.actions';

export const buyingInvestmentDistributionsFeatureKey = 'buyingInvestmentDistributions';

export interface State extends EntityState<BuyingInvestmentDistribution> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<BuyingInvestmentDistribution> = createEntityAdapter<BuyingInvestmentDistribution>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(BuyingInvestmentDistributionActions.getBuyingInvestmentDistributions, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(BuyingInvestmentDistributionActions.doneLoadingBuyingInvestmentDistributions, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(BuyingInvestmentDistributionActions.failLoadingBuyingInvestmentDistributions, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(BuyingInvestmentDistributionActions.setSelectedBuyingInvestmentDistribution, ((state, action) => {
      return {...state, selected: action.buyingInvestmentDistributionId};
    })
  ),
  on(BuyingInvestmentDistributionActions.addBuyingInvestmentDistribution,
    (state, action) => adapter.addOne(action.buyingInvestmentDistribution, state)
  ),
  on(BuyingInvestmentDistributionActions.upsertBuyingInvestmentDistribution,
    (state, action) => adapter.upsertOne(action.buyingInvestmentDistribution, state)
  ),
  on(BuyingInvestmentDistributionActions.addBuyingInvestmentDistributions,
    (state, action) => adapter.addMany(action.buyingInvestmentDistributions, state)
  ),
  on(BuyingInvestmentDistributionActions.upsertBuyingInvestmentDistributions,
    (state, action) => adapter.upsertMany(action.buyingInvestmentDistributions, state)
  ),
  on(BuyingInvestmentDistributionActions.updateBuyingInvestmentDistribution,
    (state, action) => adapter.updateOne(action.buyingInvestmentDistribution, state)
  ),
  on(BuyingInvestmentDistributionActions.updateBuyingInvestmentDistributions,
    (state, action) => adapter.updateMany(action.buyingInvestmentDistributions, state)
  ),
  on(BuyingInvestmentDistributionActions.deleteBuyingInvestmentDistribution,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(BuyingInvestmentDistributionActions.deleteBuyingInvestmentDistributions,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(BuyingInvestmentDistributionActions.loadBuyingInvestmentDistributions,
    (state, action) => adapter.setAll(action.buyingInvestmentDistributions, state)
  ),
  on(BuyingInvestmentDistributionActions.clearBuyingInvestmentDistributions,
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
