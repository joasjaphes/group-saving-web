import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromReducer from './loan-queue.reducer';
import * as fromMembers from '../member/member.selectors';
import * as fromLoanTypes from '../loan-type/loan-type.selectors';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.loanQueuesFeatureKey);

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

export const selectDetailed = createSelector(
  selectAll,
  fromMembers.selectEntities,
  fromLoanTypes.selectEntities,
  (allItems, members, loanTypes) => allItems
    .map(
      item => {
        return {
          ...item,
          member: members[item.member_id],
          loanType: loanTypes[item.loan_type_id],
        };
      }
    ).sort((a, b) => a.date > b.date ? 1 : -1)
);
