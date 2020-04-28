import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ContributionTypeBalance } from './contribution-type-balance.model';
import * as ContributionTypeBalanceActions from './contribution-type-balance.actions';

export const contributionTypeBalancesFeatureKey = 'contributionTypeBalances';

export interface State extends EntityState<ContributionTypeBalance> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<ContributionTypeBalance> = createEntityAdapter<ContributionTypeBalance>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(ContributionTypeBalanceActions.getContributionTypeBalances, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(ContributionTypeBalanceActions.doneLoadingContributionTypeBalances, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(ContributionTypeBalanceActions.failLoadingContributionTypeBalances, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(ContributionTypeBalanceActions.setSelectedContributionTypeBalance, ((state, action) => {
      return {...state, selected: action.contributionTypeBalanceId};
    })
  ),
  on(ContributionTypeBalanceActions.addContributionTypeBalance,
    (state, action) => adapter.addOne(action.contributionTypeBalance, state)
  ),
  on(ContributionTypeBalanceActions.upsertContributionTypeBalance,
    (state, action) => adapter.upsertOne(action.contributionTypeBalance, state)
  ),
  on(ContributionTypeBalanceActions.addContributionTypeBalances,
    (state, action) => adapter.addMany(action.contributionTypeBalances, state)
  ),
  on(ContributionTypeBalanceActions.upsertContributionTypeBalances,
    (state, action) => adapter.upsertMany(action.contributionTypeBalances, state)
  ),
  on(ContributionTypeBalanceActions.updateContributionTypeBalance,
    (state, action) => adapter.updateOne(action.contributionTypeBalance, state)
  ),
  on(ContributionTypeBalanceActions.updateContributionTypeBalances,
    (state, action) => adapter.updateMany(action.contributionTypeBalances, state)
  ),
  on(ContributionTypeBalanceActions.deleteContributionTypeBalance,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ContributionTypeBalanceActions.deleteContributionTypeBalances,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ContributionTypeBalanceActions.loadContributionTypeBalances,
    (state, action) => adapter.setAll(action.contributionTypeBalances, state)
  ),
  on(ContributionTypeBalanceActions.clearContributionTypeBalances,
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
