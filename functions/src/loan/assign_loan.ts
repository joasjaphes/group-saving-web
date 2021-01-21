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
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      const loanTypeDocRef = admin.firestore().doc(`groups/${groupId}/loan_type/${data.loanUsed}`);
      const memberLoanQueueRef = admin.firestore().collection(`groups/${groupId}/loan_queue`).where('member_id', '==', data.memberId);
      await admin.firestore().runTransaction(async transaction => {
        const groupDoc = await transaction.get(groupDocRef);
        const loanType = await transaction.get(loanTypeDocRef);
        const groupData: any = {...groupDoc.data()};
        const loan_queues = await transaction.get(memberLoanQueueRef);
        const loanId = helpers.makeid();
        const loanTypeData: any = {...loanType.data()};
        const loanQueueData = loan_queues.docs.map(i => i.data());
        const loanDocRef = admin.firestore().doc(`groups/${groupId}/loan/${loanId}`);
        transaction.set(loanDocRef, prepareLoan(loanId, data, loanTypeData, last_update, loanQueueData), {merge: true});
        transaction.update(groupDocRef, {...groupData, last_update});
        transaction.set(otherUpdateAtRef, {
          loan_updated: last_update,
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

function prepareLoan(loanId: string, data: any, currentLoanType: any, last_update: any,  loanQueue: any) {
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
