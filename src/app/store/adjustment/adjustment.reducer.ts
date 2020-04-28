import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Adjustment } from './adjustment.model';
import * as AdjustmentActions from './adjustment.actions';

export const adjustmentsFeatureKey = 'adjustments';

export interface State extends EntityState<Adjustment> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<Adjustment> = createEntityAdapter<Adjustment>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(AdjustmentActions.getAdjustments, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(AdjustmentActions.doneLoadingAdjustments, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(AdjustmentActions.failLoadingAdjustments, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(AdjustmentActions.setSelectedAdjustment, ((state, action) => {
      return {...state, selected: action.adjustmentId};
    })
  ),
  on(AdjustmentActions.addAdjustment,
    (state, action) => adapter.addOne(action.adjustment, state)
  ),
  on(AdjustmentActions.upsertAdjustment,
    (state, action) => adapter.upsertOne(action.adjustment, state)
  ),
  on(AdjustmentActions.addAdjustments,
    (state, action) => adapter.addMany(action.adjustments, state)
  ),
  on(AdjustmentActions.upsertAdjustments,
    (state, action) => adapter.upsertMany(action.adjustments, state)
  ),
  on(AdjustmentActions.updateAdjustment,
    (state, action) => adapter.updateOne(action.adjustment, state)
  ),
  on(AdjustmentActions.updateAdjustments,
    (state, action) => adapter.updateMany(action.adjustments, state)
  ),
  on(AdjustmentActions.deleteAdjustment,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(AdjustmentActions.deleteAdjustments,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(AdjustmentActions.loadAdjustments,
    (state, action) => adapter.setAll(action.adjustments, state)
  ),
  on(AdjustmentActions.clearAdjustments,
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
