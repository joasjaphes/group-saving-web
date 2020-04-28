import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShareDividend } from './share-dividend.model';
import * as ShareDividendActions from './share-dividend.actions';

export const shareDividendsFeatureKey = 'shareDividends';

export interface State extends EntityState<ShareDividend> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<ShareDividend> = createEntityAdapter<ShareDividend>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(ShareDividendActions.getShareDividends, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(ShareDividendActions.doneLoadingShareDividends, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(ShareDividendActions.failLoadingShareDividends, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(ShareDividendActions.setSelectedShareDividend, ((state, action) => {
      return {...state, selected: action.shareDividendId};
    })
  ),
  on(ShareDividendActions.addShareDividend,
    (state, action) => adapter.addOne(action.shareDividend, state)
  ),
  on(ShareDividendActions.upsertShareDividend,
    (state, action) => adapter.upsertOne(action.shareDividend, state)
  ),
  on(ShareDividendActions.addShareDividends,
    (state, action) => adapter.addMany(action.shareDividends, state)
  ),
  on(ShareDividendActions.upsertShareDividends,
    (state, action) => adapter.upsertMany(action.shareDividends, state)
  ),
  on(ShareDividendActions.updateShareDividend,
    (state, action) => adapter.updateOne(action.shareDividend, state)
  ),
  on(ShareDividendActions.updateShareDividends,
    (state, action) => adapter.updateMany(action.shareDividends, state)
  ),
  on(ShareDividendActions.deleteShareDividend,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ShareDividendActions.deleteShareDividends,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ShareDividendActions.loadShareDividends,
    (state, action) => adapter.setAll(action.shareDividends, state)
  ),
  on(ShareDividendActions.clearShareDividends,
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
