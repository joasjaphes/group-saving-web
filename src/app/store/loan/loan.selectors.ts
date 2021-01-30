import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromReducer from './loan.reducer';
import * as fromLoanTypes from '../loan-type/loan-type.selectors';
import {getRouteState} from '../index';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.loansFeatureKey);

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

export const selectLoanByMember = (memberId: string) => createSelector(
  selectAll,
  fromLoanTypes.selectEntities,
  (allItems, loanTypes) => allItems
    .filter(i => i.member_id === memberId)
    .map(i => ({
        ...i,
        loanType: {
          ...loanTypes[i.loan_used]
        }
      })
    )
);

export const selectLoanByMemberFromRoute = createSelector(
  selectAll,
  getRouteState,
  fromLoanTypes.selectEntities,
  (allItems, routeState, loanTypes) => {
    const memberId = routeState.state && routeState.state.params ? routeState.state.params.id : null;

    return  allItems
      .filter(i => i.member_id === memberId)
      .map(i => ({
          ...i,
          loanType: {
            ...loanTypes[i.loan_used]
          }
        })
      );
  }
);


export const selectTotalByYear = (year) => createSelector(
  selectAll,
  (allItems) => {
    // const items = allItems.filter(i => i.start_year + '' === year + '');
    const items = allItems;
    let sum = 0;
    for (const item of items) {
      sum += parseFloat(item.amount_taken + '');
    }
    return sum;
  }
);

