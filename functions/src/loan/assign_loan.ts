import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

export const assignLoanToMember = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (request.method !== 'POST') {
      if (request.method !== 'OPTIONS') {
        response.status(400).send({data: 'Please send a POST request'});
        return;
      }
    }
    const data = request.body;
    const tokenId = request.get('Authorization')?.split('Bearer ')[1];
    if (tokenId !== helpers.token) {
      response.status(400).send({data: 'Invalid token please send a valid token'});
      return;
    }
    try {
      const groupId = data.groupId;
      const last_update = new Date().getTime();
      const groupDocRef = admin.firestore().doc(`groups/${groupId}`);
      const memberRef = admin.firestore().doc(`groups/${data.groupId}/members/${data.memberId}`);
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      await admin.firestore().runTransaction(async transaction => {
        const groupDoc = await transaction.get(groupDocRef);
        const groupData: any = {...groupDoc.data()};
        const memberDoc = await transaction.get(memberRef);
        const memberData: any = {...memberDoc.data()};
        const loanId = helpers.makeid();
        const loanTypeData: any = groupData.loanTypes[data.loanUsed];
        const old_loan_queue = groupData.loan_queue || [];
        const loanDetails = prepareLoan(loanId, data, loanTypeData, last_update);
        if (memberData.active_loans) {
          memberData.active_loans[loanDetails.id] = loanDetails;
        } else {
          memberData.active_loans = {};
          memberData.active_loans[loanDetails.id] = loanDetails;
        }
        // update contribution balance
        const account = loanTypeData ? loanTypeData.contribution_type_id : null;
        if (account && groupData.contribution_balances && groupData.contribution_balances[account]) {
          groupData.contribution_balances[account] = parseFloat(groupData.contribution_balances[account] + '') - parseFloat(data.amountTaken);
          if (groupData.contribution_balances[account] < 0) { // contingency in case balance goes to zero
            groupData.contribution_balances[account] = 0;
          }
        }
        const loan_queue = old_loan_queue.filter((item: any) => !(item.member_id === data.memberId && item.loan_type_id === data.loanUsed));
        transaction.update(memberRef, {...memberData, last_update});
        transaction.update(groupDocRef, {...groupData, loan_queue, last_update});
        transaction.set(otherUpdateAtRef, {
          member_updated: last_update,
          group_updated: last_update,
        }, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error assigning loan to member:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});

function prepareLoan(loanId: string, data: any, currentLoanType: any, last_update: any) {
  const loan: any = {
    id: loanId,
    group_id: data.groupId,
    last_update,
    member_id: data.memberId,
    loan_used: data.loanUsed,
    amount_taken: data.amountTaken,
    duration: data.duration,
    duration_type: currentLoanType ? currentLoanType.duration_type : 'Monthly',
    total_amount_to_pay: data.return_amount || 0,
    amount_paid_to_date: 0,
    amount_per_return: data.amount_per_return || 0,
    date: helpers.formatDate(data.date),
    expected_date_of_payment: helpers.formatDate(data.end_date),
    start_month: helpers.getMonth(data.date),
    start_year: helpers.getYear(data.date),
    end_month: helpers.getMonth(data.end_date),
    end_year: helpers.getYear(data.end_date),
    account_used: currentLoanType.contribution_type_id,
    total_profit_contribution: data.total_profit_contribution,
    remaining_balance: data.return_amount,
    payments: [],
    additional_config: {},
  };
  let total_amount_to_cut = 0;
  if (currentLoanType && currentLoanType.is_insured && currentLoanType.insurance_percent) {
    loan.insurance_amount = data.insurance_amount;
    total_amount_to_cut += parseFloat(data.insurance_amount + '');

  }
  if (currentLoanType && currentLoanType.payment_option === 'Cut profit from the loan') {
    total_amount_to_cut += parseFloat(loan.total_profit_contribution + '');
    const payment: any = {
      id: helpers.makeid(),
      period: helpers.getYear(data.date) + '' + helpers.getMonth(data.date),
      month: helpers.getMonth(data.date),
      year: helpers.getYear(data.date),
      amount: total_amount_to_cut,
      paid_on_time: true,
      date_of_payment: helpers.formatDate(data.date),
      member_id: data.memberId,
    };
    loan.payments.push(payment);
    loan.amount_paid_to_date = total_amount_to_cut;
    loan.remaining_balance = ( loan.total_amount_to_pay - 0 ) - parseFloat(loan.total_profit_contribution + '');
  }

  return loan;
}
