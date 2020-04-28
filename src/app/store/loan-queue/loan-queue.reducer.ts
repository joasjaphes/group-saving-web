import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LoanQueue } from './loan-queue.model';
import * as LoanQueueActions from './loan-queue.actions';

export const loanQueuesFeatureKey = 'loanQueues';

export interface State extends EntityState<LoanQueue> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<LoanQueue> = createEntityAdapter<LoanQueue>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(LoanQueueActions.getLoanQueues, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(LoanQueueActions.doneLoadingLoanQueues, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(LoanQueueActions.failLoadingLoanQueues, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(LoanQueueActions.setSelectedLoanQueue, ((state, action) => {
      return {...state, selected: action.loanQueueId};
    })
  ),
  on(LoanQueueActions.addLoanQueue,
    (state, action) => adapter.addOne(action.loanQueue, state)
  ),
  on(LoanQueueActions.upsertLoanQueue,
    (state, action) => adapter.upsertOne(action.loanQueue, state)
  ),
  on(LoanQueueActions.addLoanQueues,
    (state, action) => adapter.addMany(action.loanQueues, state)
  ),
  on(LoanQueueActions.upsertLoanQueues,
    (state, action) => adapter.upsertMany(action.loanQueues, state)
  ),
  on(LoanQueueActions.updateLoanQueue,
    (state, action) => adapter.updateOne(action.loanQueue, state)
  ),
  on(LoanQueueActions.updateLoanQueues,
    (state, action) => adapter.updateMany(action.loanQueues, state)
  ),
  on(LoanQueueActions.deleteLoanQueue,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LoanQueueActions.deleteLoanQueues,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LoanQueueActions.loadLoanQueues,
    (state, action) => adapter.setAll(action.loanQueues, state)
  ),
  on(LoanQueueActions.clearLoanQueues,
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
