import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { frequency, groupId, fistTime  }
 */
export const addNewContribution = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (request.method !== 'POST') {
      if (request.method !== 'OPTIONS') {
        response.status(400).send('Please send a POST request');
        return;
      }
    }
    const data = request.body;
    const tokenId = request.get('Authorization')?.split('Bearer ')[1];
    if (tokenId !== helpers.token) {
      response.status(400).send('Invalid token please send a valid token');
      return;
    }
    try {
      const groupId = data.groupId;
      const batch = admin.firestore().batch();
      const last_update = new Date().getTime();
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      const memberRef = admin.firestore().doc(`groups/${data.groupId}/members/${data.memberId}`);
      const groupDocRef = admin.firestore().doc(`groups/${groupId}`);
      const done_paying_loans = [];
      await admin.firestore().runTransaction(async (transaction) => {
        const groupDoc = await transaction.get(groupDocRef);
        const groupData: any = {...groupDoc.data()};
        const memberDoc = await transaction.get(memberRef);
        const memberData: any = {...memberDoc.data()};
        const fineTypes = groupData.fines || {};
        const contributionTypes = groupData.contributions || {};
        const loanConfigs = groupData.loanTypes || {};
        // set new balances if group is contribution needs to track balances
        for (const key in data.contributions) {
          if (data.contributions.hasOwnProperty(key)) {
            const contrType = contributionTypes[key];
            const amount = data.contributions[key] + '';
            if (!!amount && contrType && contrType.track_balance && groupData.contribution_balances && groupData.contribution_balances[key]) {
              groupData.contribution_balances[key] = parseFloat(groupData.contribution_balances[key] + '') + parseFloat(amount);
            }
          }
        }
        // Update contribution balance from loan returns
        for (const key in data.loans) {
          if (data.loans.hasOwnProperty(key)) {
            const loan_used = memberData.active_loans && memberData.active_loans[key] ? memberData.active_loans[key].loan_used : null;
            const account = loan_used && loanConfigs[loan_used] ? loanConfigs[loan_used].contribution_type_id : null;
            if ( account ) {
              const contrType = contributionTypes[account];
              const amount = data.loans[key] + '';
              if (!!amount && contrType && contrType.track_balance && groupData.contribution_balances && groupData.contribution_balances[account]) {
                groupData.contribution_balances[account] = parseFloat(groupData.contribution_balances[account] + '') + parseFloat(amount);
              }
            }
          }
        }

        // Update contribution balance from fines
        for (const key in data.fines) {
          if (data.fines.hasOwnProperty(key)) {
            const account =  fineTypes[key] ? fineTypes[key].contribution_type_id : null;
            if ( account ) {
              const contrType = contributionTypes[account];
              const amount = data.fines[key] + '';
              if (!!amount && contrType && contrType.track_balance && groupData.contribution_balances && groupData.contribution_balances[account]) {
                groupData.contribution_balances[account] = parseFloat(groupData.contribution_balances[account] + '') + parseFloat(amount);
              }
            }
          }
        }

        const current_active_loans = memberData.active_loans ? Object.keys(memberData.active_loans).map(key => memberData.active_loans[key]) : [];
        const updated_active_loans = prepareLoanPayment(current_active_loans, data, loanConfigs, fineTypes, groupData);
        const completed_loans: any[] = [];
        const done_paying = updated_active_loans.done_paying;
        let active_loans = {...updated_active_loans.active_loans};
        if ( done_paying.length > 0 ) {
          done_paying.forEach(loanId => {
            if ( active_loans[loanId] ) {
              completed_loans.push(active_loans[loanId]);
              active_loans = Object.keys(active_loans).reduce((object: any, key: string) => {
                if (key !== loanId) {
                  object[key] = active_loans[key];
                }
                return object;
              }, {});
            }
          });
        }

        completed_loans.forEach((loan) => {
          done_paying_loans.push(loan);
          const loanRef = admin.firestore().doc(`groups/${data.groupId}/loans/${loan.id}`);
          transaction.set(loanRef, {...loan, last_update }, {merge: true});
        });
        memberData.active_loans = active_loans;
        const paymentRef = admin.firestore().doc(`groups/${data.groupId}/payments/${helpers.makeid()}`);
        const paymentData = preparePayment(data, groupData);
        transaction.update(groupDocRef, { ...groupData , last_update});
        transaction.update(memberRef, {...memberData, last_update});
        transaction.set(paymentRef, {...paymentData, last_update});
        if (completed_loans.length > 0) {
          transaction.set(otherUpdateAtRef, {
            loan_updated: last_update,
            group_updated: last_update,
            payments_updated: last_update,
            member_updated: last_update,
          }, {merge: true});
        } else {
          transaction.set(otherUpdateAtRef, {
            group_updated: last_update,
            payments_updated: last_update,
            member_updated: last_update,
          }, {merge: true});
        }

      });
      await batch.commit();
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});

function preparePayment(data: any, group: any) {
  return {
    id: helpers.makeid(),
    ...data,
    year: group.track_contribution_period ? data.year : helpers.getYear(data.date),
    month: group.track_contribution_period ? data.month : helpers.getMonth(data.date),
    date: helpers.formatDate(data.date),
  };
}

// function calculateTotal(data: any) {
//   let total  = 0;
//   for (const key in data.loans) {
//     if (data.loans.hasOwnProperty(key)) {
//       const amount = data.loans[key] + '';
//       if (!!amount) {
//         total = parseFloat(total + '') + parseFloat(data.loans[key] + '');
//       }
//     }
//   }
//   for (const key in data.fines) {
//     if (data.fines.hasOwnProperty(key)) {
//       const amount = data.fines[key] + '';
//       if (!!amount) {
//         total = parseFloat(total + '') + parseFloat(data.fines[key] + '');
//       }
//     }
//   }
//   for (const key in data.contributions) {
//     if (data.contributions.hasOwnProperty(key)) {
//       const amount = data.contributions[key] + '';
//       if (!!amount) {
//         total = parseFloat(total + '') + parseFloat(data.contributions[key] + '');
//       }
//     }
//   }
//   return total;
// }

function prepareLoanFines(data: any, fineConfig: any, loanId: string, group: any) {
  const finesArr: any = {};
  const fines = data.fines;
  for (const fineKey in fines ) {
    if (fines.hasOwnProperty(fineKey)) {
      const currentFineType = fineConfig[fineKey];
      const currentFineLoanType = currentFineType ? currentFineType.loan_type_id : '';
      const fineAmount = fines[fineKey] + '';
      if (!!fineAmount && currentFineLoanType === loanId ) {
        finesArr[loanId] = {
          id: helpers.makeid(),
          member_id: data.memberId,
          amount: parseFloat(fineAmount),
          date: helpers.formatDate(data.date),
          month: group.track_contribution_period ? data.month : helpers.getMonth(data.date),
          year: group.track_contribution_period ? data.year : helpers.getYear(data.date),
          fine_id: currentFineType ? currentFineType.id : '',
        };
      }
    }
  }
  return finesArr;
}

function prepareLoanPayment(member_active_loans: any, data: any, loanConfigs: any, fineConfig: any, group: any) {
  const active_loans: any = {};
  const loanreturn = data.loans;
  const done_paying: any[] = [];
  member_active_loans.forEach((loan: any) => {
    const loan_fines = prepareLoanFines(data, fineConfig, loan.loan_used, group);
    let total_profit_contribution = loan.total_profit_contribution;
    let amount_per_return = loan.amount_per_return;
    let remaining_balance = loan.remaining_balance;
    let total_amount_to_pay = loan.total_amount_to_pay;
    let amount_paid_to_date = loan.amount_paid_to_date;
    const fines = loan.fines || [];
    const payments = [...loan.payments];
    if (loanreturn[loan.id] && loanreturn[loan.id] !== null && parseInt(loanreturn[loan.id] + '', 10) !== 0 ) {
      remaining_balance = loan.remaining_balance - loanreturn[loan.id]; // calculate remaining balance
      amount_paid_to_date = parseFloat(loan.amount_paid_to_date + '') + parseFloat(loanreturn[loan.id] + '');
      // if loan is of type reducing balance add to profit contribution
      if ( loanConfigs[loan.loan_used] && loanConfigs[loan.loan_used].profit_type === 'Reducing Balance') {
        total_profit_contribution = parseFloat(loan.total_profit_contribution + '') + parseFloat(loan.amount_per_return + '');
        amount_per_return = remaining_balance * (loanConfigs[loan.loan_used].profit_percent / 100);
        remaining_balance = remaining_balance + (amount_per_return - 0);
        total_amount_to_pay = total_amount_to_pay + (amount_per_return - 0);
      }else {
        if ( remaining_balance <= 0 ) {
          total_profit_contribution = loan.total_amount_to_pay - loan.amount_taken;
        }
      }
      const payment: any = {
        id: helpers.makeid(),
        period: group.track_contribution_period ? data.year + '' + data.month : helpers.getYear(data.date) + '' + helpers.getMonth(data.date),
        month: group.track_contribution_period ? data.month : helpers.getMonth(data.date),
        year: group.track_contribution_period ? data.year : helpers.getYear(data.date),
        amount: loanreturn[loan.id],
        paid_on_time: true,
        payment_mode: data.paymentMode || '',
        payment_type: data.paymentType || '',
        reference_number: data.referenceNumber || '',
        date_of_payment: helpers.formatDate(data.date),
        member_id: data.memberId,
      };
      if ( loan_fines[loan.loan_used] ) {
        payment.fine = loan_fines[loan.loan_used];
      }
      payments.push(payment);
    }

    // add fines if the fine is associate with that loan
    if ( loan_fines[loan.loan_used] ) {
      fines.push(loan_fines[loan.loan_used]);
    }

    // add payments information,
    if ( remaining_balance <= 0 ) {
      done_paying.push(loan.id);
    }
    active_loans[loan.id] = {
      ...loan,
      fines,
      remaining_balance,
      total_amount_to_pay,
      total_profit_contribution,
      amount_per_return,
      amount_paid_to_date,
      payments,
    };
  });
  return { active_loans, done_paying };
}
