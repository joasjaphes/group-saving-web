import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromReducer from './payment.reducer';
import * as fromContributionTypes from '../contribution-type/contribution-type.selectors';
import * as fromFineTypes from '../fine-type/fine-type.selectors';
import * as fromLoanTypes from '../loan-type/loan-type.selectors';
import * as fromLoan from '../loan/loan.selectors';
import * as fromExpense from '../expense/expense.selectors';
import * as fromMember from '../member/member.selectors';
import {Payment} from './payment.model';
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
      const contributionsDetails = !!item.contributions ? Object.keys(item.contributions).map(contrId => ({
        contr_id: contrId,
        name: contributionTypes[contrId] ? contributionTypes[contrId].name : '',
        amount: item.contributions[contrId],
      })) : null;
      const fineDetails = !!item.fines ? Object.keys(item.fines).map(contrId => ({
        id: contrId,
        name: fineTypes[contrId] ? fineTypes[contrId].description : '',
        amount: item.fines[contrId],
      })) : null;
      const loanDetails = !!item.loans ? Object.keys(item.loans).map(contrId => ({
        id: loans[contrId] && loanTypes[loans[contrId].loan_used] ? loanTypes[loans[contrId].loan_used].id : '',
        name: loans[contrId] && loanTypes[loans[contrId].loan_used] ? loanTypes[loans[contrId].loan_used].name : '',
        amount: item.loans[contrId],
      })) : null;
      if (contributionsDetails) {
        contrDetails.push(...contributionsDetails.map(i => `${i.name} ${i.amount}`));
        paymentItems.push(...contributionsDetails);
      }
      if (fineDetails) {
        contrDetails.push(...fineDetails.map(i => `${i.name} ${i.amount}`));
        paymentItems.push(...fineDetails);
      }
      if (loanDetails) {
        contrDetails.push(...loanDetails.map(i => `${i.name} ${i.amount}`));
        paymentItems.push(...loanDetails);
      }
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
              if (memberData[member.id].totals[contr.contr_id]) {
                memberData[member.id].totals[contr.contr_id]['amount'] += parseFloat(contr.amount);
              } else {
                memberData[member.id].totals[contr.contr_id] = {...contr};
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

export const selectDetailedGroupBySingleMember = (year, memberId) => createSelector(
  selectDetailedGroupByMember(year),
  (items) => {
    return items.filter(i => i.id === memberId)[0];
  }
);

export const selectDetailedGroupByMonth = (year) => createSelector(
  selectDetailed,
  (allItems) => {
    const monthNames = [
      {name: 'Jan ' + year, key: '01'},
      {name: 'Feb ' + year, key: '02'},
      {name: 'Mar ' + year, key: '03'},
      {name: 'Apr ' + year, key: '04'},
      {name: 'May ' + year, key: '05'},
      {name: 'Jun ' + year, key: '06'},
      {name: 'Jul ' + year, key: '07'},
      {name: 'Aug ' + year, key: '08'},
      {name: 'Sep ' + year, key: '09'},
      {name: 'Oct ' + year, key: '10'},
      {name: 'Nov ' + year, key: '11'},
      {name: 'Dec ' + year, key: '12'},
    ];
    const monthData = {};
    for (const month of monthNames) {
      const key = month.key + year;
      monthData[key] = {type: 'month', id: month.key + year, key: month.key, name: month.name, total: 0, totals: {}, items: []};
      allItems
        .filter(item => item.month + '' === month.key && item.year + '' === year + '')
        .forEach(item => {
          console.log({item});
          monthData[key].total += parseFloat(item.totalContributions + '');
          for (const contr of item.contributionsDetails) {
            if (monthData[key].totals[contr.contr_id]) {
              monthData[key].totals[contr.contr_id]['amount'] += parseFloat(contr.amount);
            } else {
              monthData[key].totals[contr.contr_id] = {
                contr_id: contr.contr_id,
                name: contr.name,
                amount: parseFloat(contr.amount)
              };
            }
          }
        });
      monthData[key].items = Object.keys(monthData[key].totals).map(i => monthData[key].totals[i]);
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
                  memberData[member.id].totals[contr.id] = {...contr};
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
    const monthNames = [{name: 'Jan ' + year, key: '01'}, {name: 'Feb ' + year, key: '02'}, {
      name: 'Mar ' + year,
      key: '03'
    }, {name: 'Apr ' + year, key: '04'}, {name: 'May ' + year, key: '05'}, {name: 'Jun ' + year, key: '06'}, {
      name: 'Jul ' + year,
      key: '07'
    }, {name: 'Aug ' + year, key: '08'}, {name: 'Sep ' + year, key: '09'}, {name: 'Oct ' + year, key: '10'}, {
      name: 'Nov ' + year,
      key: '11'
    }, {name: 'Dec ' + year, key: '12'}];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
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
                  monthData[month.key].totals[contr.id] = {...contr};
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


export const selectContributionTypeSummary = (year) => createSelector(
  selectDetailed,
  fromContributionTypes.selectRepeating,
  (allItems, contributionTypes) => {
    console.log({contributionTypes});
    const summary = {};
    for (const contr of contributionTypes) {
      summary[contr.id] = {name: contr.name, total: 0, id: contr.id};
      allItems
        .filter(i => year === 'All' || i.year + '' === year + '')
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

export const selectFineTypesSummary = (year) => createSelector(
  selectDetailed,
  fromFineTypes.selectAll,
  (allItems, contributionTypes) => {
    const summary = {};
    summary['All'] = {name: 'All', total: 0, id: 'All'};
    for (const contr of contributionTypes) {
      summary[contr.id] = {name: contr.description, total: 0, id: contr.id};
      allItems
        .filter(i => year === 'All' || i.year + '' === year + '')
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


export const selectContributionOnlyByMember = (memberId) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => memberId === i.memberId && i.contributionsDetails.length > 0)
);


export const selectContributionByTypeByYear = (year, typeId) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => i.year + '' === year + '' || year === 'All')
    .filter(i => !!i.contributionsDetails.find(k => k.contr_id === typeId))
    .map(i => ({
      ...i,
      totalContributions: i.contributionsDetails.filter(k => k.contr_id === typeId).map(k => k.amount).reduce((j, k) => k + j),
      description: i.contributionsDetails.filter(k => k.contr_id === typeId).map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
    }))
);


export const selectContributionByMonthByYear = (year, month) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(item => item.month + '' === month + '' && item.year + '' === year + '')
    .filter(i => !!i.totalContributions)
    .map(i => ({
      ...i,
      description: i.contributionsDetails.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
    }))
);


export const selectContributionByMemberByYear = (year, memberId) => createSelector(
  selectDetailed,
  (allItems) => {
    const items = allItems
      .filter(i => i.memberId === memberId)
      .filter(i => year === 'All' || i.year + '' === year + '')
      .filter(i => !!i.totalContributions);
    return  items.map(i => ({
      ...i,
      description: i.contributionsDetails.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
    }));
  }
);


export const selectContributionMemberMonthSummary = (months: string[], contributionTypeId) => createSelector(
  selectDetailed,
  fromMember.selectAll,
  (allItems, members) => {
    return members.map(member => {
      const memberMonth = {};
      let total = 0;
      months.forEach(month => {
        const date = month.split('-');
        const year = date[0];
        const mon = date[1];
        const key = `${year}${mon}`;
        const memberContr = allItems
          .filter(i => i.memberId === member.id)
          .filter(i => !!i.contributionsDetails.find(k => (k.contr_id === contributionTypeId || contributionTypeId === 'All')))
          .filter(i => i.year + '' === year + '' && i.month + '' === mon + '');
        memberMonth[key] = 0;
        memberContr.forEach(item => {
          for (const contr of item.contributionsDetails) {
            if (contributionTypeId === 'All' || contr.contr_id === contributionTypeId) {
              memberMonth[key] += parseFloat(contr.amount + '');
              total += parseFloat(contr.amount + '');
            }
          }
        });
      });
      return {
        name: member.name,
        phoneNumber: member.phone_number,
        email: member.email,
        memberMonth,
        total,
      };
    });
  }
);

export const selectContributionByMonth = (month, year) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => month === i.month && i.contributionsDetails.length > 0 && year + '' === i.year + '')
);


export const selectTotalPaymentByYear = (year, contributionType, memberId?) => createSelector(
  selectDetailed,
  (allItems) => {
    const items = allItems
      .filter(i => year === 'All' || i.year + '' === year + '')
      .filter(i => !!i.contributionsDetails.find(k => (k.contr_id === contributionType || contributionType === 'All')))
      .filter(i => memberId === 'All' || i.memberId === memberId);
    // const items = allItems;
    let sum = 0;
    for (const item of items) {
      const contr = Object.keys(item.contributions).filter(i => contributionType === 'All' || i === contributionType).map(i => item.contributions[i]);
      for (const amount of contr) {
        sum += !!(amount + '') ? parseFloat(amount + '') : 0;
      }
    }
    return sum;
  }
);

export const selectTotalLoanPaymentByYear = (year, contributionType, memberId?) => createSelector(
  selectDetailed,
  fromLoanTypes.selectEntities,
  fromLoan.selectEntities,
  (allItems, loanTypes, loans) => {
    const items = allItems
      .filter(i => year === 'All' || i.year + '' === year + '')
      .filter(i => memberId === 'All' || i.memberId === memberId);
    // const items = allItems;/
    let sum = 0;
    for (const item of items) {
      const contr = Object.keys(item.loans)
        .map(i => ({loanUsed: loans[i] ? loanTypes[loans[i].loan_used] : null, amount: item.loans[i]}))
        .filter(i => contributionType === 'All' || (i.loanUsed && i.loanUsed.contribution_type_id === contributionType));
      for (const amount of contr) {
        sum += !!(amount.amount + '') ? parseFloat(amount.amount + '') : 0;
      }
    }
    return sum;
  }
);

export const selectTotalFinePaymentByYear = (year, contributionType, memberId?) => createSelector(
  selectDetailed,
  fromFineTypes.selectEntities,
  (allItems, fineTypes) => {
    const items = allItems
      .filter(i => year === 'All' || i.year + '' === year + '')
      .filter(i => memberId === 'All' || i.memberId === memberId)
      .filter(i => Object.keys(i.fines).length > 0);
    // const items = allItems;
    let sum = 0;
    for (const item of items) {
      const contr = Object.keys(item.fines)
        .map(i => ({fineType: fineTypes[i], amount: item.fines[i]}))
        .filter(i => contributionType === 'All' || (i.fineType && i.fineType.contribution_type_id === contributionType))
      ;
      for (const amount of contr) {
        sum += !!(amount.amount + '') ? parseFloat(amount.amount + '') : 0;
      }
    }
    return sum;
  }
);

export const selectTotalIn = (year, contributionType, memberId?) => createSelector(
  selectTotalPaymentByYear(year, contributionType, memberId),
  selectTotalLoanPaymentByYear(year, contributionType, memberId),
  selectTotalFinePaymentByYear(year, contributionType, memberId),
  (payments, loans, fines) => {
    return payments + loans + fines;
  }
);


export const selectTotalContributions = (year, contributionType, memberId) => createSelector(
  selectTotalPaymentByYear(year, contributionType, memberId),
  selectTotalLoanPaymentByYear(year, contributionType, memberId),
  selectTotalFinePaymentByYear(year, contributionType, memberId),
  (payments, loans, fines) => {
    return payments + fines;
  }
);

export const selectTotalByYear = (year, contributionType, memberId?) => createSelector(
  fromExpense.selectTotalByYear(year, contributionType, memberId),
  fromLoan.selectTotalByYear(year, contributionType, memberId),
  (fines, loans) => {
    return loans + fines;
  }
);


export const selectFinesByMemberByYear = (year, memberId, fineType) => createSelector(
  selectDetailed,
  (allItems) => allItems
    .filter(i => i.memberId === memberId)
    .filter(i => year === 'All' || i.year + '' === year + '')
    .filter(i => !!i.fineDetails.find(k => (k.id === fineType || fineType === 'All')))
    .map(i => ({
      ...i,
      description: i.fineDetails.map(k => `${k.name} ${numberWithCommas(k.amount)}`).join(', ')
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
