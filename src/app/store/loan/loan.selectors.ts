import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromReducer from './loan.reducer';
import * as fromLoanTypes from '../loan-type/loan-type.selectors';
import * as fromMember from '../member/member.selectors';
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

export const selectDetailed = createSelector(
  selectAll,
  fromLoanTypes.selectEntities,
  fromMember.selectEntities,
  (allItems, loanTypes, members) => allItems
    .map(i => ({
        ...i,
        percentPaid: parseInt(((i.amount_paid_to_date / i.total_amount_to_pay) * 100) + '', 10),
        durationName: durationTYpe(i.duration_type),
        member: members[i.member_id],
        loanType: {
          ...loanTypes[i.loan_used]
        }
      })
    )
);

export const selectLoanByMember = (memberId: string) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => i.member_id === memberId)
);

export const selectLoanByMemberFromRoute = createSelector(
  selectDetailed,
  getRouteState,
  (allItems, routeState) => {
    const memberId = routeState.state && routeState.state.params ? routeState.state.params.id : null;
    return allItems
      .filter(i => i.member_id === memberId);
  }
);

export const selectActiveLoans = createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => parseFloat(i.remaining_balance + '') > 0)
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

export function durationTYpe(frequency) {
  switch (frequency) {
    case 'Monthly':
      return 'Months';
    case 'Weekly':
      return 'Weeks';
    case 'Yearly':
      return 'Years';
    default:
      return '';
  }
}
