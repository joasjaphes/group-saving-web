import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LongTermInvestmentItem } from './long-term-investment-item.model';
import * as LongTermInvestmentItemActions from './long-term-investment-item.actions';

export const longTermInvestmentItemsFeatureKey = 'longTermInvestmentItems';

export interface State extends EntityState<LongTermInvestmentItem> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<LongTermInvestmentItem> = createEntityAdapter<LongTermInvestmentItem>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(LongTermInvestmentItemActions.getLongTermInvestmentItems, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(LongTermInvestmentItemActions.doneLoadingLongTermInvestmentItems, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(LongTermInvestmentItemActions.failLoadingLongTermInvestmentItems, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(LongTermInvestmentItemActions.setSelectedLongTermInvestmentItem, ((state, action) => {
      return {...state, selected: action.longTermInvestmentItemId};
    })
  ),
  on(LongTermInvestmentItemActions.addLongTermInvestmentItem,
    (state, action) => adapter.addOne(action.longTermInvestmentItem, state)
  ),
  on(LongTermInvestmentItemActions.upsertLongTermInvestmentItem,
    (state, action) => adapter.upsertOne(action.longTermInvestmentItem, state)
  ),
  on(LongTermInvestmentItemActions.addLongTermInvestmentItems,
    (state, action) => adapter.addMany(action.longTermInvestmentItems, state)
  ),
  on(LongTermInvestmentItemActions.upsertLongTermInvestmentItems,
    (state, action) => adapter.upsertMany(action.longTermInvestmentItems, state)
  ),
  on(LongTermInvestmentItemActions.updateLongTermInvestmentItem,
    (state, action) => adapter.updateOne(action.longTermInvestmentItem, state)
  ),
  on(LongTermInvestmentItemActions.updateLongTermInvestmentItems,
    (state, action) => adapter.updateMany(action.longTermInvestmentItems, state)
  ),
  on(LongTermInvestmentItemActions.deleteLongTermInvestmentItem,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LongTermInvestmentItemActions.deleteLongTermInvestmentItems,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LongTermInvestmentItemActions.loadLongTermInvestmentItems,
    (state, action) => adapter.setAll(action.longTermInvestmentItems, state)
  ),
  on(LongTermInvestmentItemActions.clearLongTermInvestmentItems,
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
