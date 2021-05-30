import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SharePeriod } from './share-period.model';
import * as SharePeriodActions from './share-period.actions';

export const sharePeriodsFeatureKey = 'sharePeriods';

export interface State extends EntityState<SharePeriod> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<SharePeriod> = createEntityAdapter<SharePeriod>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(SharePeriodActions.getSharePeriods, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(SharePeriodActions.doneLoadingSharePeriods, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(SharePeriodActions.failLoadingSharePeriods, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(SharePeriodActions.setSelectedSharePeriod, ((state, action) => {
      return {...state, selected: action.sharePeriodId};
    })
  ),
  on(SharePeriodActions.addSharePeriod,
    (state, action) => adapter.addOne(action.sharePeriod, state)
  ),
  on(SharePeriodActions.upsertSharePeriod,
    (state, action) => adapter.upsertOne(action.sharePeriod, state)
  ),
  on(SharePeriodActions.addSharePeriods,
    (state, action) => adapter.addMany(action.sharePeriods, state)
  ),
  on(SharePeriodActions.upsertSharePeriods,
    (state, action) => adapter.upsertMany(action.sharePeriods, state)
  ),
  on(SharePeriodActions.updateSharePeriod,
    (state, action) => adapter.updateOne(action.sharePeriod, state)
  ),
  on(SharePeriodActions.updateSharePeriods,
    (state, action) => adapter.updateMany(action.sharePeriods, state)
  ),
  on(SharePeriodActions.deleteSharePeriod,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(SharePeriodActions.deleteSharePeriods,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(SharePeriodActions.loadSharePeriods,
    (state, action) => adapter.setAll(action.sharePeriods, state)
  ),
  on(SharePeriodActions.clearSharePeriods,
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
