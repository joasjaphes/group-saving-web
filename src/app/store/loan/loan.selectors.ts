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
        memberName: members[i.member_id] ? members[i.member_id].name : '',
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

export const selectActiveLoansSummary = (loanType, memberId) => createSelector(
  selectDetailed,
  (allItems) => {
    const totals = { totalOut: 0, paid: 0, unpaid: 0, percent: 0 };
    const activeLoans = allItems
      .filter(i => memberId === 'All' || i.member_id === memberId)
      .filter(i => parseFloat(i.remaining_balance + '') > 0)
      .filter(i => i.loan_used === loanType || loanType === 'All');
    activeLoans.forEach(item => {
      totals.totalOut += parseFloat(item.total_amount_to_pay + '');
      totals.paid += parseFloat(item.amount_paid_to_date + '');
      totals.unpaid += parseFloat(item.remaining_balance + '');
    });
    if (totals.totalOut) {
      const percent =  (totals.paid / totals.totalOut) * 100;
      totals.percent = parseInt(percent + '', 10);
    }
    return totals;
  }
);

export const selectCompletedLoans = createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => parseFloat(i.remaining_balance + '') <= 0)
);


export const selectTotalByYear = (year, contributionType, memberId) => createSelector(
  selectDetailed,
  (allItems) => {
    const items = allItems
      .filter(i => year === 'All' || i.start_year + '' === year + '')
      .filter(i => i.member_id === memberId || memberId === 'All')
      .filter(i => contributionType === 'All' || (i.loanType && i.loanType.contribution_type_id === contributionType));
    // const items = allItems;
    let sum = 0;
    for (const item of items) {
      sum += parseFloat(item.amount_taken + '');
    }
    return sum;
  }
);

export const selectLoansActiveBetweenDates = (startDate, endDate, months: string[], loanType: string) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => i.loan_used === loanType || loanType === 'All')
    .map(
    item => {
      const monthData = {};
      for (const month of months) {
        const date = month.split('-');
        const year = date[0];
        const mon = date[1];
        const key = `${year}${mon}`;
        monthData[key] = 0;
        for (const pay of item.payments) {
          const useKey = `${pay.year}${pay.month}`;
          if (useKey === key) {
            monthData[key] += parseFloat(pay.amount + '');
          }
        }
      }
      const loanStartDate = `${item.start_year}-${item.start_month}-01`;
      const loanEndDate = `${item.end_year}-${item.end_month}-01`;
      return {
        ...item,
        monthData
      };
    }
  )
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
