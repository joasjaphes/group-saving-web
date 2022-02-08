import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromReducer from './contribution-type.reducer';
import {numberWithCommas} from '../fine-type/fine-type.selectors';
import {ContributionTypes} from './contribution-type.enum';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.contributionTypesFeatureKey);

export const selectIds = createSelector(selectCurrentState, fromReducer.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromReducer.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromReducer.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromReducer.selectTotal);
export const selectLoading = createSelector(selectCurrentState, fromReducer.getLoading);
export const selectCurrentId = createSelector(selectCurrentState, fromReducer.getSelectedId);
export const selectError = createSelector(selectCurrentState, fromReducer.getError);

export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);

export const selectedWithLoan = createSelector(
  selectAll, (allItems) => allItems.filter(i => i.allow_loan)
);

export const selectRepeating = createSelector(
  selectAll, (allItems) => allItems.filter(i => !i.is_one_time_contribution)
);

export const selectOneTime = createSelector(
  selectAll, (allItems) => allItems.filter(i => i.is_one_time_contribution)
);

export const selectDetailed = createSelector(
  selectAll,
  (allItems) => allItems.map(item => {
    let textDescription = '';
    if (item.is_must && item.is_fixed) {
      textDescription = 'Each member will contribute ' + numberWithCommas(item.fixed_value) + ' ' + item.collection_frequency;
    } else if (item.is_must && !item.is_fixed) {
      if (item.minimum_contribution) {
        textDescription = 'Each member will contribute a minimum of ' + numberWithCommas(item.minimum_contribution) + ' ' + item.collection_frequency;
      } else {
        textDescription = 'This contribution is optional';
      }
    }
    if (item.type === ContributionTypes.Share) {
      textDescription += ', Price of a single share is ' + numberWithCommas(item.hisa_value);
    }
    return {
      ...item,
      textDescription,
    };
  })
);
