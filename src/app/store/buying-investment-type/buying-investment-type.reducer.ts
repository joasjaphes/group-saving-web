import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BuyingInvestmentType } from './buying-investment-type.model';
import * as BuyingInvestmentTypeActions from './buying-investment-type.actions';

export const buyingInvestmentTypesFeatureKey = 'buyingInvestmentTypes';

export interface State extends EntityState<BuyingInvestmentType> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<BuyingInvestmentType> = createEntityAdapter<BuyingInvestmentType>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(BuyingInvestmentTypeActions.getBuyingInvestmentTypes, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(BuyingInvestmentTypeActions.doneLoadingBuyingInvestmentTypes, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(BuyingInvestmentTypeActions.failLoadingBuyingInvestmentTypes, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(BuyingInvestmentTypeActions.setSelectedBuyingInvestmentType, ((state, action) => {
      return {...state, selected: action.buyingInvestmentTypeId};
    })
  ),
  on(BuyingInvestmentTypeActions.addBuyingInvestmentType,
    (state, action) => adapter.addOne(action.buyingInvestmentType, state)
  ),
  on(BuyingInvestmentTypeActions.upsertBuyingInvestmentType,
    (state, action) => adapter.upsertOne(action.buyingInvestmentType, state)
  ),
  on(BuyingInvestmentTypeActions.addBuyingInvestmentTypes,
    (state, action) => adapter.addMany(action.buyingInvestmentTypes, state)
  ),
  on(BuyingInvestmentTypeActions.upsertBuyingInvestmentTypes,
    (state, action) => adapter.upsertMany(action.buyingInvestmentTypes, state)
  ),
  on(BuyingInvestmentTypeActions.updateBuyingInvestmentType,
    (state, action) => adapter.updateOne(action.buyingInvestmentType, state)
  ),
  on(BuyingInvestmentTypeActions.updateBuyingInvestmentTypes,
    (state, action) => adapter.updateMany(action.buyingInvestmentTypes, state)
  ),
  on(BuyingInvestmentTypeActions.deleteBuyingInvestmentType,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(BuyingInvestmentTypeActions.deleteBuyingInvestmentTypes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(BuyingInvestmentTypeActions.loadBuyingInvestmentTypes,
    (state, action) => adapter.setAll(action.buyingInvestmentTypes, state)
  ),
  on(BuyingInvestmentTypeActions.clearBuyingInvestmentTypes,
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
