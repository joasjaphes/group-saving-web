import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LongTermInvestmentType } from './long-term-investment-type.model';
import * as LongTermInvestmentTypeActions from './long-term-investment-type.actions';

export const longTermInvestmentTypesFeatureKey = 'longTermInvestmentTypes';

export interface State extends EntityState<LongTermInvestmentType> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<LongTermInvestmentType> = createEntityAdapter<LongTermInvestmentType>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(LongTermInvestmentTypeActions.getLongTermInvestmentTypes, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(LongTermInvestmentTypeActions.doneLoadingLongTermInvestmentTypes, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(LongTermInvestmentTypeActions.failLoadingLongTermInvestmentTypes, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(LongTermInvestmentTypeActions.setSelectedLongTermInvestmentType, ((state, action) => {
      return {...state, selected: action.longTermInvestmentTypeId};
    })
  ),
  on(LongTermInvestmentTypeActions.addLongTermInvestmentType,
    (state, action) => adapter.addOne(action.longTermInvestmentType, state)
  ),
  on(LongTermInvestmentTypeActions.upsertLongTermInvestmentType,
    (state, action) => adapter.upsertOne(action.longTermInvestmentType, state)
  ),
  on(LongTermInvestmentTypeActions.addLongTermInvestmentTypes,
    (state, action) => adapter.addMany(action.longTermInvestmentTypes, state)
  ),
  on(LongTermInvestmentTypeActions.upsertLongTermInvestmentTypes,
    (state, action) => adapter.upsertMany(action.longTermInvestmentTypes, state)
  ),
  on(LongTermInvestmentTypeActions.updateLongTermInvestmentType,
    (state, action) => adapter.updateOne(action.longTermInvestmentType, state)
  ),
  on(LongTermInvestmentTypeActions.updateLongTermInvestmentTypes,
    (state, action) => adapter.updateMany(action.longTermInvestmentTypes, state)
  ),
  on(LongTermInvestmentTypeActions.deleteLongTermInvestmentType,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LongTermInvestmentTypeActions.deleteLongTermInvestmentTypes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LongTermInvestmentTypeActions.loadLongTermInvestmentTypes,
    (state, action) => adapter.setAll(action.longTermInvestmentTypes, state)
  ),
  on(LongTermInvestmentTypeActions.clearLongTermInvestmentTypes,
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
