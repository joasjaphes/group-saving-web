import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ContributionType } from './contribution-type.model';
import * as ContributionTypeActions from './contribution-type.actions';

export const contributionTypesFeatureKey = 'contributionTypes';

export interface State extends EntityState<ContributionType> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<ContributionType> = createEntityAdapter<ContributionType>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(ContributionTypeActions.getContributionTypes, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(ContributionTypeActions.doneLoadingContributionTypes, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(ContributionTypeActions.failLoadingContributionTypes, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(ContributionTypeActions.setSelectedContributionType, ((state, action) => {
      return {...state, selected: action.contributionTypeId};
    })
  ),
  on(ContributionTypeActions.addContributionType,
    (state, action) => adapter.addOne(action.contributionType, state)
  ),
  on(ContributionTypeActions.upsertContributionType,
    (state, action) => adapter.upsertOne(action.contributionType, state)
  ),
  on(ContributionTypeActions.addContributionTypes,
    (state, action) => adapter.addMany(action.contributionTypes, state)
  ),
  on(ContributionTypeActions.upsertContributionTypes,
    (state, action) => adapter.upsertMany(action.contributionTypes, state)
  ),
  on(ContributionTypeActions.updateContributionType,
    (state, action) => adapter.updateOne(action.contributionType, state)
  ),
  on(ContributionTypeActions.updateContributionTypes,
    (state, action) => adapter.updateMany(action.contributionTypes, state)
  ),
  on(ContributionTypeActions.deleteContributionType,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ContributionTypeActions.deleteContributionTypes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ContributionTypeActions.loadContributionTypes,
    (state, action) => adapter.setAll(action.contributionTypes, state)
  ),
  on(ContributionTypeActions.clearContributionTypes,
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
