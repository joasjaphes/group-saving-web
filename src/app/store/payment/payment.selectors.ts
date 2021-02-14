import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './payment.reducer';
import * as fromContributionTypes from '../contribution-type/contribution-type.selectors';
import * as fromFineTypes from '../fine-type/fine-type.selectors';
import * as fromLoanTypes from '../loan-type/loan-type.selectors';
import * as fromLoan from '../loan/loan.selectors';
import * as fromMember from '../member/member.selectors';
import {Payment} from './payment.model';
import {findAllSubstringIndices} from '@angular/cdk/schematics';
import {numberWithCommas} from '../fine-type/fine-type.selectors';

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
      const paymentItems = [];
      const contributionsDetails = Object.keys(item.contributions).map(contrId => ({
        id: contrId,
        name: contributionTypes[contrId] ? contributionTypes[contrId].name : '',
        amount: item.contributions[contrId],
      }));
      const fineDetails = Object.keys(item.fines).map(contrId => ({
        id: contrId,
        name: fineTypes[contrId] ? fineTypes[contrId].description : '',
        amount: item.fines[contrId],
      }));
      const loanDetails = Object.keys(item.loans).map(contrId => ({
        id: loans[contrId] && loanTypes[loans[contrId].loan_used] ? loanTypes[loans[contrId].loan_used].id : '',
        name: loans[contrId] && loanTypes[loans[contrId].loan_used] ? loanTypes[loans[contrId].loan_used].name : '',
        amount: item.loans[contrId],
      }));
      contrDetails.push(...contributionsDetails.map(i => `${i.name} ${i.amount}`));
      contrDetails.push(...fineDetails.map(i => `${i.name} ${i.amount}`));
      contrDetails.push(...loanDetails.map(i => `${i.name} ${i.amount}`));
      paymentItems.push(...contributionsDetails);
      paymentItems.push(...fineDetails);
      paymentItems.push(...loanDetails);
      return {
        ...item,
        contributionsDetails,
        fineDetails,
        paymentItems,
        member: members[item.memberId],
        description: contrDetails.join(', '),
        ...findTotal(item)
      };
    });
  }
);

export const selectDetailedGroupByMember = (year) => createSelector(
  selectDetailed,
  fromMember.selectAll,
  (allItems, members) => {
    const memberData = {};
    for (const member of members) {
      memberData[member.id] = {type: 'member', id: member.id, name: member.name, total: 0, totals: {}, items: []};
      allItems.filter(i => i.year + '' === year + '')
        .forEach(item => {
        if (item.memberId === member.id) {
          memberData[member.id].total += parseFloat(item.totalContributions + '');
          for (const contr of item.contributionsDetails) {
            if (memberData[member.id].totals[contr.id]) {
              memberData[member.id].totals[contr.id]['amount'] += parseFloat(contr.amount);
            } else {
              memberData[member.id].totals[contr.id] = contr;
            }
          }
        }
      });
      memberData[member.id].items = Object.keys(memberData[member.id].totals).map(i => memberData[member.id].totals[i]);
    }
    return Object
      .keys(memberData)
      .map(i => ({
        ...memberData[i],
        description: memberData[i].items.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
      }))
      .filter(i => !!i.total);
  }
);

export const selectDetailedGroupByMonth = (year) => createSelector(
  selectDetailed,
  (allItems) => {
    const monthNames = [{name: 'Jan ' + year, key: '01'}, {name: 'Feb ' + year, key: '02'}, {name: 'Mar ' + year, key: '03'}, {name: 'Apr ' + year, key: '04'}, {name: 'May ' + year, key: '05'}, {name: 'Jun ' + year, key: '06'}, {name: 'Jul ' + year, key: '07'}, {name: 'Aug ' + year, key: '08'}, {name: 'Sep ' + year, key: '09'}, {name: 'Oct ' + year, key: '10'}, {name: 'Nov ' + year, key: '11'},  {name: 'Dec ' + year, key: '12'}];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',  '12'];
    const monthData = {};
    for (const month of monthNames) {
      monthData[month.key] = {type: 'month', id: month.key + year, key: month.key, name: month.name, total: 0, totals: {}, items: []};
      allItems
        .filter(item => item.month + '' === month.key && item.year + '' === year + '')
        .forEach(item => {
        if (item.month === month.key && item.year + '' === year + '') {
          monthData[month.key].total += parseFloat(item.totalContributions + '');
          for (const contr of item.contributionsDetails) {
            if (monthData[month.key].totals[contr.id]) {
              monthData[month.key].totals[contr.id]['amount'] += parseFloat(contr.amount);
            } else {
              monthData[month.key].totals[contr.id] = contr;
            }
          }
        }
      });
      monthData[month.key].items = Object.keys(monthData[month.key].totals).map(i => monthData[month.key].totals[i]);
    }
    return Object
      .keys(monthData)
      .map(i => ({
        ...monthData[i],
        description: monthData[i].items.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
      }))
      .filter(i => !!i.total);
  }
);

export const selectFinesDetailedGroupByMember = (year, fineType) => createSelector(
  selectDetailed,
  fromMember.selectAll,
  (allItems, members) => {
    const memberData = {};
    for (const member of members) {
      memberData[member.id] = {type: 'member', id: member.id, name: member.name, total: 0, totals: {}, items: []};
      allItems.filter(i => i.year + '' === year + '')
        .forEach(item => {
        if (item.memberId === member.id) {
          for (const contr of item.fineDetails) {
            if (fineType === 'All' || fineType === contr.id) {
              if (memberData[member.id].totals[contr.id]) {
                memberData[member.id].totals[contr.id]['amount'] += parseFloat(contr.amount);
              } else {
                memberData[member.id].totals[contr.id] = contr;
              }
              memberData[member.id].total += parseFloat(contr.amount);
            }
          }
        }
      });
      memberData[member.id].items = Object.keys(memberData[member.id].totals).map(i => memberData[member.id].totals[i]);
    }
    return Object
      .keys(memberData)
      .map(i => ({
        ...memberData[i],
        description: memberData[i].items.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
      }))
      .filter(i => !!i.total);
  }
);

export const selectFineDetailedGroupByMonth = (year, fineType) => createSelector(
  selectDetailed,
  (allItems) => {
    const monthNames = [{name: 'Jan ' + year, key: '01'}, {name: 'Feb ' + year, key: '02'}, {name: 'Mar ' + year, key: '03'}, {name: 'Apr ' + year, key: '04'}, {name: 'May ' + year, key: '05'}, {name: 'Jun ' + year, key: '06'}, {name: 'Jul ' + year, key: '07'}, {name: 'Aug ' + year, key: '08'}, {name: 'Sep ' + year, key: '09'}, {name: 'Oct ' + year, key: '10'}, {name: 'Nov ' + year, key: '11'},  {name: 'Dec ' + year, key: '12'}];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',  '12'];
    const monthData = {};
    for (const month of monthNames) {
      monthData[month.key] = {type: 'month', id: month.key + year, key: month.key, name: month.name, total: 0, totals: {}, items: []};
      allItems
        .filter(item => item.month + '' === month.key && item.year + '' === year + '')
        .forEach(item => {
        if (item.month === month.key && item.year + '' === year + '') {
          for (const contr of item.fineDetails) {
            if (fineType === 'All' || fineType === contr.id) {
              if (monthData[month.key].totals[contr.id]) {
                monthData[month.key].totals[contr.id]['amount'] += parseFloat(contr.amount);
              } else {
                monthData[month.key].totals[contr.id] = contr;
              }
              monthData[month.key].total += parseFloat(contr.amount);
            }
          }
        }
      });
      monthData[month.key].items = Object.keys(monthData[month.key].totals).map(i => monthData[month.key].totals[i]);
    }
    return Object
      .keys(monthData)
      .map(i => ({
        ...monthData[i],
        description: monthData[i].items.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
      }))
      .filter(i => !!i.total);
  }
);

export const selectYearsWithPayment = createSelector(
  selectAll,
  (allItems) => {
    const years = [];
    allItems.forEach(item => {
      if (years.indexOf(item.year + '') === -1) {
        years.push(item.year + '');
      }
    });
    return years.length > 0 ? years : [new Date().getFullYear() + ''];
  }
);

export const selectContributionByMemberByYear = (year, memberId) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => i.year + '' === year + '' && i.memberId === memberId)
    .map(i => ({
      ...i,
      description: i.contributionsDetails.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
    }))
);

export const selectFinesByMemberByYear = (year, memberId, fineType) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => i.year + '' === year + '' && i.memberId === memberId)
    .filter(i => !!i.fineDetails.find(k => (k.id === fineType || fineType === 'All')))
    .map(i => ({
      ...i,
      description: i.fineDetails.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
    }))
);

export const selectContributionByTypeByYear = (year, typeId) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => i.year + '' === year + '' && !!i.contributionsDetails.find(k => k.id === typeId))
    .map(i => ({
      ...i,
      description: i.contributionsDetails.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
    }))
);

export const selectContributionByMonthByYear = (year, month) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(item => item.month + '' === month + '' && item.year + '' === year + '')
    .map(i => ({
      ...i,
      description: i.contributionsDetails.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
    }))
);

export const selectFinesByMonthByYear = (year, month, fineType) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(item => item.month + '' === month + '' && item.year + '' === year + '')
    .filter(i => !!i.fineDetails.find(k => (k.id === fineType || fineType === 'All')))
    .map(i => ({
      ...i,
      description: i.fineDetails.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
    }))
);

export const selectContributionTypeSummary = (year) => createSelector(
  selectDetailed,
  fromContributionTypes.selectRepeating,
  (allItems, contributionTypes) => {
    const summary = {};
    for (const contr of contributionTypes) {
      summary[contr.id] = {name: contr.name, total: 0, id: contr.id};
      allItems
        .filter(i => i.year + '' === year + '')
        .forEach(item => {
        if (item.contributions) {
          if (Object.keys(item.contributions).indexOf(contr.id) !== -1) {
            summary[contr.id].total += parseFloat(item.contributions[contr.id] + '');
          }
        }
      });
    }
    return Object.keys(summary).map(i => summary[i]);
  }
);

export const selectFIneTypesSummary = (year) => createSelector(
  selectDetailed,
  fromFineTypes.selectAll,
  (allItems, contributionTypes) => {
    const summary = {};
    summary['All'] = {name: 'All', total: 0, id: 'All'};
    for (const contr of contributionTypes) {
      summary[contr.id] = {name: contr.description, total: 0, id: contr.id};
      allItems
        .filter(i => i.year + '' === year + '')
        .forEach(item => {
        if (item.fines) {
          if (Object.keys(item.fines).indexOf(contr.id) !== -1) {
            summary[contr.id].total += parseFloat(item.fines[contr.id] + '');
            summary['All'].total += parseFloat(item.fines[contr.id] + '');
          }
        }
      });
    }
    return Object.keys(summary).map(i => summary[i]);
  }
);

export const selectTotalPaymentByYear = (year, contributionType) => createSelector(
  selectDetailed,
  (allItems) => {
    const items = allItems
      .filter(i => i.year + '' === year + '')
      .filter(i => !!i.contributionsDetails.find(k => (k.id === contributionType || contributionType === 'All')));
    // const items = allItems;
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

export const selectTotalLoanPaymentByYear = (year, contributionType) => createSelector(
  selectAll,
  (allItems) => {
    const items = allItems
      .filter(i => i.year + '' === year + '')
      .filter(i => !!i.contributionsDetails.find(k => (k.id === contributionType || contributionType === 'All')));
    // const items = allItems;/
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

export const selectTotalFinePaymentByYear = (year, contributionType) => createSelector(
  selectAll,
  (allItems) => {
    const items = allItems
      .filter(i => i.year + '' === year + '')
      .filter(i => !!i.contributionsDetails.find(k => (k.id === contributionType || contributionType === 'All')));
    // const items = allItems;
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

export const selectTotalIn = (year, contributionType) => createSelector(
  selectTotalPaymentByYear(year, contributionType),
  selectTotalLoanPaymentByYear(year, contributionType),
  selectTotalFinePaymentByYear (year, contributionType),
  (payments, loans, fines) => {
    return payments + loans + fines;
  }
);

export const selectTotalContributions = (year, contributionType) => createSelector(
  selectTotalPaymentByYear(year, contributionType),
  selectTotalLoanPaymentByYear(year, contributionType),
  selectTotalFinePaymentByYear (year, contributionType),
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
  let totalContributions = 0;
  let totalFines = 0;
  let totalLoans = 0;
  Object.keys(payment.contributions).forEach(item => {
    const val = payment.contributions[item];
    if (val) {
      sum += parseFloat(val);
      totalContributions += parseFloat(val);
    }
  });
  Object.keys(payment.loans).forEach(item => {
    const val = payment.loans[item];
    if (val) {
      sum += parseFloat(val);
      totalLoans += parseFloat(val);
    }
  });
  Object.keys(payment.fines).forEach(item => {
    const val = payment.fines[item];
    if (val) {
      sum += parseFloat(val);
      totalFines += parseFloat(val);
    }
  });
  return {
    totalAmount: sum,
    totalContributions,
    totalFines,
    totalLoans,
  };
}
