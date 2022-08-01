import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromMember from '../member/member.selectors';
import * as fromContributionTypes from '../contribution-type/contribution-type.selectors';
import * as fromReducer from './one-time-payment.reducer';
import {ContributionType} from '../contribution-type/contribution-type.model';
import {selectGroupId} from '../user/user.selectors';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.oneTimePaymentsFeatureKey);

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
  (allItems, groupId) => allItems.filter(i => i.groupId === groupId)
);

export const selectDetailed = createSelector(
  selectByCurrentGroup,
  fromContributionTypes.selectEntities,
  fromMember.selectEntities,
  (
    allItems,
    contributionTypes,
    members
  ) => {
    return allItems.map(item => {
      const contrDetails = [];
      const contributionsDetails = contributionTypes[item.contributionId];
      return {
        ...item,
        contributionsDetails,
        member: members[item.memberId],
        description: contrDetails.join(', '),
      };
    });
  }
);

export const selectByContrId = (contrId) => createSelector(
  selectDetailed,
  (allItems) => allItems.filter(i => i.contributionId === contrId)
);

export const selectMemberOneTime = createSelector(
  selectAll,
  fromMember.selectAll,
  fromContributionTypes.selectOneTime,
  (allItems, members, contributionTypes) => {
    const membersContributions: {[id: string]: ContributionType[]} = {};
    members.forEach(member => {
      const memberItems = allItems.filter(i => i.memberId === member.id);
      const types = contributionTypes.filter(j => memberItems.map(i => i.contributionId).indexOf(j.id) === -1)
      membersContributions[member.id] = types;
    });
    return membersContributions;
  }
)

export const selectSummary = createSelector(
  selectDetailed,
  fromContributionTypes.selectOneTime,
  (allItems, contributionTypes) => {
    return contributionTypes.map(item => ({
      ...item,
      total: allItems
        .filter(i => i.contributionId === item.id).reduce((p, c) => p + parseFloat(c.amount + ''), 0)
    }))
  }
)
