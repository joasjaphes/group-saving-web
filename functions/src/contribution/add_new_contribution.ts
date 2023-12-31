import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';
import {PaymentModel} from '../data-models/payment.model';
import {LoanModel, SingleLoanModel} from '../data-models/loan.model';

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
    const dataItem = request.body;
    let data = request.body;
    const tokenId = request.get('Authorization')?.split('Bearer ')[1];
    if (tokenId !== helpers.token) {
      response.status(400).send('Invalid token please send a valid token');
      return;
    }
    try {
      const groupId = data.groupId;
      const last_update = new Date().getTime();
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      const memberRef = admin.firestore().doc(`groups/${data.groupId}/members/${data.memberId}`);
      const groupDocRef = admin.firestore().doc(`groups/${groupId}`);
      const done_paying_loans: SingleLoanModel[] = [];
      await admin.firestore().runTransaction(async (transaction) => {
        const groupDoc = await transaction.get(groupDocRef);
        const groupData: any = {...groupDoc.data()};
        const memberDoc = await transaction.get(memberRef);
        const memberData: any = {...memberDoc.data()};
        if (dataItem.fromPending && Object.keys(memberData.pendingPayment ?? {}).length > 3) {
          data = {
            ...data,
            ...memberData.pendingPayment,
          }
        }
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

        // Update the current active loans for a member and remove from list if loan is completed
        const current_active_loans = memberData.active_loans ? Object.keys(memberData.active_loans).map(key => memberData.active_loans[key]) : [];
        const updated_active_loans = prepareLoanPayment(current_active_loans, data, loanConfigs, fineTypes, groupData);
        const completed_loans: SingleLoanModel[] = [];
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
        memberData.active_loans = active_loans;
        if (dataItem.fromPending) {
          memberData.pendingPayment = {}
        }

        // Add list of completed loans to the members data
        const loanRef = admin.firestore().doc(`groups/${groupId}/loans/member_${data.memberId}`);
        const loanDoc = await transaction.get(loanRef);
        const existingLoanData = loanDoc.exists ? loanDoc.data() as LoanModel : helpers.prepareEmptyLoan(data, groupData);
        completed_loans.forEach((loan) => {
          done_paying_loans.push(loan);
          existingLoanData.loans[loan.id] = loan;
        });

        // Prepare payment data and merge them into a correct period
        const paymentDocRef = admin.firestore().doc(`groups/${data.groupId}/payments/period_${data.period}`);
        const paymentDoc = await transaction.get(paymentDocRef);
        const existingPaymentData = paymentDoc.exists ? paymentDoc.data() as PaymentModel : helpers.prepareEmptyPayment(data, groupData);
        const paymentData = helpers.preparePayment(data, groupData, existingPaymentData, false, false);
        transaction.update(groupDocRef, { ...groupData , last_update});
        transaction.update(memberRef, {...memberData, last_update});
        transaction.set(paymentDocRef, {...paymentData, last_update}, {merge: true});
        if (completed_loans.length > 0) {
          transaction.set(loanRef, {...existingLoanData, last_update }, {merge: true});
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

      }).then(() => {
        helpers.sendNotification({
          groupId: data.groupId,
          title: `${data.groupName}: New Contribution`,
          body: `${data.memberName} has submitted new Contribution of ${calculateTotal(data)} on ${new Date(helpers.formatDate(data.date)).toUTCString().substring(0, 16)}`,
          type: 'new_contribution',
          id: 'new_contribution',
        }).then(() => null)
          .catch((error) => console.log(error));
        if (done_paying_loans.length > 0) {
          done_paying_loans.forEach((loan) => {
            helpers.sendNotification({
              groupId: data.groupId,
              title: `${data.memberName} Finished Paying Loan`,
              body: `${data.memberName} has finished paying a loan of ${loan.amount_paid_to_date}`,
              type: 'completed_loan',
              id: loan.id ?? '',
            }).then(() => null)
              .catch((error) => console.log(error));
          })
        }
      });

      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});

function calculateTotal(data: any) {
  let total  = 0;
  for (const key in data.loans) {
    total = parseFloat(total + '') + parseFloat(data.loans[key] + '');
  }
  for (const key in data.fines) {
    total = parseFloat(total + '') + parseFloat(data.fines[key] + '');
  }
  for (const key in data.contributions) {
    total = parseFloat(total + '') + parseFloat(data.contributions[key] + '');
  }
  return total;
}

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

function prepareLoanPayment(
  member_active_loans: any,
  data: any,
  loanConfigs: any,
  fineConfig: any,
  group: any): { active_loans: { [id: string]: SingleLoanModel }, done_paying: string[] } {
  const active_loans: any = {};
  const loanReturn = data.loans;
  const interestRate = data.interestRate ?? {};
  const baseAmount = data.baseAmount ?? {};
  const done_paying: any[] = [];
  member_active_loans.forEach((loan: any) => {
    const loan_fines = prepareLoanFines(data, fineConfig, loan.loan_used, group);
    let total_profit_contribution = loan.total_profit_contribution;
    let amount_per_return = loan.amount_per_return;
    let remaining_balance = loan.remaining_balance;
    const total_amount_to_pay = loan.total_amount_to_pay;
    let amount_paid_to_date = loan.amount_paid_to_date;
    const fines = loan.fines || [];
    const payments = [...loan.payments];
    const previous_balance = loan.remaining_balance;
    const profitType = loanConfigs[loan.loan_used] ? loanConfigs[loan.loan_used].profit_type : 'Fixed Percent';
    if (loanReturn[loan.id] && loanReturn[loan.id] !== null && parseInt(loanReturn[loan.id] + '', 10) !== 0 ) {
      if (profitType === 'Reducing Balance') {
        remaining_balance = loan.remaining_balance - baseAmount[loan.id] ?? 0; // calculate remaining balance
        total_profit_contribution = parseFloat(loan.total_profit_contribution + '') + interestRate[loan.id] ?? 0;
        amount_per_return = 0;
        amount_paid_to_date = parseFloat(loan.amount_paid_to_date + '') + parseFloat(baseAmount[loan.id] + '');
      } else {
        remaining_balance = loan.remaining_balance - loanReturn[loan.id]; // calculate remaining balance
        amount_paid_to_date = parseFloat(loan.amount_paid_to_date + '') + parseFloat(loanReturn[loan.id] + '');
        if ( remaining_balance <= 0 ) {
          total_profit_contribution = loan.total_amount_to_pay - loan.amount_taken;
        }
      }
      // if loan is of type reducing balance add to profit contribution
      const payment: any = {
        id: helpers.makeid(),
        period: group.track_contribution_period ? data.year + '' + data.month : helpers.getYear(data.date) + '' + helpers.getMonth(data.date),
        month: group.track_contribution_period ? data.month : helpers.getMonth(data.date),
        year: group.track_contribution_period ? data.year : helpers.getYear(data.date),
        amount: loanReturn[loan.id],
        interest_rate: interestRate[loan.id] || 0,
        loan_amount: baseAmount[loan.id] || 0,
        paid_on_time: true,
        payment_mode: data.paymentMode || '',
        payment_type: data.paymentType || '',
        reference_number: data.referenceNumber || '',
        date_of_payment: helpers.formatDate(data.date),
        member_id: data.memberId,
        previous_balance,
        new_balance: remaining_balance,
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
