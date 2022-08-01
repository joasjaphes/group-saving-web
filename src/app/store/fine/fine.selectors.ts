import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './fine.reducer';
import * as fromFineTypes from '../fine-type/fine-type.selectors';
import {selectGroupId} from '../user/user.selectors';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.finesFeatureKey);

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
  fromFineTypes.selectEntities,
  (allItems, fineTypes) => allItems.map(
    item => ({
      ...item,
        fineType: fineTypes[item.fine_id]
    })
  )
);

export const selectTotalByYear = (year) => createSelector(
  selectByCurrentGroup,
  (allItems) => {
    const items = allItems.filter(i => i.year + '' === year + '');
    let sum = 0;
    for (const item of items) {
      sum += parseFloat(item.amount + '');
    }
    return sum;
  }
);

export const selectByMember = (memberId) => createSelector(
  selectDetailed,
  (allItems) => allItems.filter(
    item => item.member_id === memberId
  )
);
