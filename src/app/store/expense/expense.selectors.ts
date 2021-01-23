import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './expense.reducer';

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

export const selectTotalByYear = (year) => createSelector(
  selectAll,
  (allItems) => {
    const items = allItems.filter(i => i.year + '' === year + '');
    let sum = 0;
    for (const item of items) {
      sum += parseFloat(item.amount + '');
    }
    return sum;
  }
);
