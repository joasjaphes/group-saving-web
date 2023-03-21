import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './fine-type.reducer';
import { selectGroupId } from '../user/user.selectors';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(
  fromReducer.fineTypesFeatureKey
);

export const selectIds = createSelector(
  selectCurrentState,
  fromReducer.selectIds
);
export const selectEntities = createSelector(
  selectCurrentState,
  fromReducer.selectEntities
);
export const selectAll = createSelector(
  selectCurrentState,
  fromReducer.selectAll
);
export const selectTotal = createSelector(
  selectCurrentState,
  fromReducer.selectTotal
);
export const selectLoading = createSelector(
  selectCurrentState,
  fromReducer.getLoading
);
export const selectCurrentId = createSelector(
  selectCurrentState,
  fromReducer.getSelectedId
);
export const selectError = createSelector(
  selectCurrentState,
  fromReducer.getError
);

export const selectById = (id: string) =>
  createSelector(selectEntities, (entities) => entities[id]);

export const selected = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => entities[id]
);

export const selectByCurrentGroup = createSelector(
  selectAll,
  selectGroupId,
  (allItems, groupId) => allItems.filter((i) => i.group_id === groupId)
);

export const selectDetailed = createSelector(selectByCurrentGroup, (allItems) =>
  allItems.map((item) => {
    let textDescription = '';
    if (item.calculation === 'Fixed') {
      textDescription +=
        'Member will pay ' + numberWithCommas(item.fixed_amount);
    }
    if (item.calculation === 'Based on current balance') {
      textDescription +=
        'Member will pay ' +
        item.balance_percentage +
        '% of the amount to return';
    }
    if (item.calculation === 'Amount per day') {
      textDescription +=
        'Member will pay ' +
        numberWithCommas(item.fixed_amount) +
        ' per each day delayed';
    }
    if (item.calculation === 'Amount per week') {
      textDescription +=
        'Member will pay ' +
        numberWithCommas(item.fixed_amount) +
        ' per each week delayed';
    }
    if (item.calculation === 'Amount per month') {
      textDescription +=
        'Member will pay ' +
        numberWithCommas(item.fixed_amount) +
        ' per each month delayed';
    }
    return {
      ...item,
      textDescription,
    };
  })
);

export const selectMeetingNotAttendingFineType = createSelector(
  selectDetailed,
  (items) =>
    items.find(
      (item) => item.type == 'Meeting' && item.meeting_type == 'not_attending'
    )
);

export const selectLateContributionFineType = (contributionType: string) =>
  createSelector(selectDetailed, (items) =>
    items.find(
      (item) =>
        item.type == 'Contribution' &&
        item.contribution_type_id == contributionType
    )
  );

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
