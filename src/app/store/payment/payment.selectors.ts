import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './payment.reducer';
import {ObjectUnsubscribedError} from 'rxjs';

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

export const selectByMember = (memberId) => createSelector(
  selectAll,
  (allItems) => allItems.filter(i => memberId === i.memberId)
);
