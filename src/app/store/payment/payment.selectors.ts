import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './payment.reducer';
import * as fromContributionTypes from '../contribution-type/contribution-type.selectors';
import * as fromFineTypes from '../fine-type/fine-type.selectors';
import * as fromLoanTypes from '../loan-type/loan-type.selectors';
import * as fromLoan from '../loan/loan.selectors';
import * as fromMember from '../member/member.selectors';
import {Payment} from './payment.model';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.paymentsFeatureKey);

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
  fromContributionTypes.selectEntities,
  fromFineTypes.selectEntities,
  fromLoanTypes.selectEntities,
  fromLoan.selectEntities,
  fromMember.selectEntities,
  (
    allItems,
    contributionTypes,
    fineTypes,
    loanTypes,
    loans,
    members
  ) => {
    return allItems.map(item => {
      const contrDetails = [];
      const contributionsDetails = Object.keys(item.contributions).map(contrId => ({
        name: contributionTypes[contrId] ? contributionTypes[contrId].name : '',
        amount: item.contributions[contrId],
      }));
      const fineDetails = Object.keys(item.fines).map(contrId => ({
        name: fineTypes[contrId] ? fineTypes[contrId].description : '',
        amount: item.fines[contrId],
      }));
      const loanDetails = Object.keys(item.loans).map(contrId => ({
        name: loans[contrId] && loanTypes[loans[contrId].loan_used] ? loanTypes[loans[contrId].loan_used].name : '',
        amount: item.loans[contrId],
      }));
      contrDetails.push(...contributionsDetails.map(i => `${i.name} ${i.amount}`));
      contrDetails.push(...fineDetails.map(i => `${i.name} ${i.amount}`));
      contrDetails.push(...loanDetails.map(i => `${i.name} ${i.amount}`));
      return {
        ...item,
        contributionsDetails,
        fineDetails,
        member: members[item.memberId],
        description: contrDetails.join(', '),
        totalAmount: findTotal(item)
      };
    });
  }
);

export const selectTotalPaymentByYear = (year) => createSelector(
  selectAll,
  (allItems) => {
    // const items = allItems.filter(i => i.year + '' === year + '');
    const items = allItems;
    let sum = 0;
    for (const item of items) {
      const contr = Object.keys(item.contributions).map(i => item.contributions[i]);
      for (const amount of contr) {
        sum += !!(amount + '') ? parseFloat(amount + '') : 0;
      }
    }
    return sum;
  }
);

export const selectTotalLoanPaymentByYear = (year) => createSelector(
  selectAll,
  (allItems) => {
    // const items = allItems.filter(i => i.year + '' === year + '');
    const items = allItems;
    let sum = 0;
    for (const item of items) {
      const contr = Object.keys(item.loans).map(i => item.loans[i]);
      for (const amount of contr) {
        sum += !!(amount + '') ? parseFloat(amount + '') : 0;
      }
    }
    return sum;
  }
);

export const selectTotalFinePaymentByYear = (year) => createSelector(
  selectAll,
  (allItems) => {
    // const items = allItems.filter(i => i.year + '' === year + '');
    const items = allItems;
    let sum = 0;
    for (const item of items) {
      const contr = Object.keys(item.fines).map(i => item.fines[i]);
      for (const amount of contr) {
        sum += !!(amount + '') ? parseFloat(amount + '') : 0;
      }
    }
    return sum;
  }
);

export const selectTotalIn = (year) => createSelector(
  selectTotalPaymentByYear(year),
  selectTotalLoanPaymentByYear(year),
  selectTotalFinePaymentByYear (year),
  (payments, loans, fines) => {
    return payments + loans + fines;
  }
);

export const selectTotalContributions = (year) => createSelector(
  selectTotalPaymentByYear(year),
  selectTotalLoanPaymentByYear(year),
  selectTotalFinePaymentByYear (year),
  (payments, loans, fines) => {
    return payments + fines;
  }
);

export const selectContributionOnlyByMember = (memberId) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => memberId === i.memberId && i.contributionsDetails.length > 0)
);

export const selectContributionByMonth = (month, year) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => month === i.month && i.contributionsDetails.length > 0 && year + '' === i.year + '')
);

export function findTotal(payment: Payment) {
  let sum = 0;
  Object.keys(payment.contributions).forEach(item => {
    const val = payment.contributions[item];
    if (val) {
      sum += parseFloat(val);
    }
  });
  Object.keys(payment.loans).forEach(item => {
    const val = payment.loans[item];
    if (val) {
      sum += parseFloat(val);
    }
  });
  Object.keys(payment.fines).forEach(item => {
    const val = payment.fines[item];
    if (val) {
      sum += parseFloat(val);
    }
  });
  return sum;
}
