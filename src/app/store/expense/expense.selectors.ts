import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './expense.reducer';
import * as fromMember from '../member/member.selectors';
import {selectGroupId} from '../user/user.selectors';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.expensesFeatureKey);

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

export const selectByCurrentGroup = createSelector(
  selectAll,
  selectGroupId,
  (allItems, groupId) => allItems.filter(i => i.group_id === groupId)
);

export const selectDetailed = createSelector(
  selectByCurrentGroup,
  fromMember.selectEntities,
  (allItems, memberEntities) => allItems.map(i => ({
    ...i,
    member: memberEntities[i.associated_member_id],
  }))
);

export const selectTotalByYear = (year, contributionType, memberId) => createSelector(
  selectByCurrentGroup,
  (allItems) => {
    const items = allItems
      .filter(i => year === 'All' || i.year + '' === year + '')
      .filter(i => i.associated_member_id === memberId || memberId === 'All')
      .filter(i => contributionType === 'All' || i.associated_account === contributionType);
    let sum = 0;
    for (const item of items) {
      sum += parseFloat(item.amount + '');
    }
    return sum;
  }
);
