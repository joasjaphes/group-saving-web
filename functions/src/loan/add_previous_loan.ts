import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';
import {LoanModel, SingleLoanModel} from '../data-models/loan.model';
import {PaymentModel} from '../data-models/payment.model';

const cors = require('cors')({origin: true});

export const assignPastActiveLoanToMember = functions.https.onRequest((request, response) => {
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
        const loanId = data.loanId ? data.loanId : helpers.makeid();
        const loanTypeData: any = groupData.loanTypes[data.loanUsed];
        const loanDetails = prepareLoan(loanId, data, loanTypeData, last_update);
        const payments: { [id: string]: PaymentModel } = {};
        if (loanDetails.payments.length > 0) {
          for (const payment of loanDetails.payments) {
            let existingPaymentData: PaymentModel = payments[payment.period];
            if (!existingPaymentData) {
              const paymentDocRef = admin.firestore().doc(`groups/${groupId}/payments/period_${payment.period}`);
              const paymentDoc = await transaction.get(paymentDocRef);
              existingPaymentData = paymentDoc.exists ? paymentDoc.data() as PaymentModel : helpers.prepareEmptyPayment(payment, groupData);
            }
            payments[memberData.period] = helpers.preparePayment({
              ...payment,
              memberId: data.memberId,
              fines: {},
              contributions: {},
              loans: {
                [loanDetails.id]: payment.amount,
              },
            }, groupData, existingPaymentData);
          }
        }
        if (parseInt(data.remaining_balance + '', 10) === 0) {
          const loanRef = admin.firestore().doc(`groups/${data.groupId}/loans/member_${data.memberId}`);
          const loanDoc = await transaction.get(loanRef);
          const existingLoanData = loanDoc.exists ? loanDoc.data() as LoanModel : helpers.prepareEmptyLoan(data, groupData);
          existingLoanData.loans[loanDetails.id] = loanDetails;
          transaction.set(loanRef, {...existingLoanData, last_update }, {merge: true});
          transaction.set(otherUpdateAtRef, {  loan_updated: last_update }, {merge: true});
          if (memberData.active_loans && memberData.active_loans[loanDetails.id]) {
            memberData.active_loans = Object.keys(memberData.active_loans).reduce((object: any, key: string) => {
              if (key !== loanDetails.id) {
                object[key] = memberData.active_loans[key];
              }
              return object;
            }, {});
            transaction.update(memberRef, {...memberData, last_update});
            transaction.set(otherUpdateAtRef, {  member_updated: last_update }, {merge: true});
          }
        } else {
          if (memberData.active_loans) {
            memberData.active_loans[loanDetails.id] = loanDetails;
          } else {
            memberData.active_loans = {};
            memberData.active_loans[loanDetails.id] = loanDetails;
          }
          transaction.update(memberRef, {...memberData, last_update});
          transaction.set(otherUpdateAtRef, {  member_updated: last_update }, {merge: true});
        }

        if (loanDetails.payments.length > 0) {
          for (const key of Object.keys(payments)) {
            const paymentRef = admin.firestore().doc(`groups/${data.groupId}/payments/${key}`);
            transaction.set(paymentRef, {...payments[key], last_update});
          }
          transaction.set(otherUpdateAtRef, {payments_updated: last_update}, {merge: true});
        }

      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error assigning loan to member:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});

function prepareLoan(loanId: string, data: any, currentLoanType: any, last_update: any): SingleLoanModel {
  const loan: SingleLoanModel = {
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
    start_year: helpers.getYear(data.date) + '',
    end_month: helpers.getMonth(data.end_date),
    end_year: helpers.getYear(data.end_date) + '',
    account_used: currentLoanType.contribution_type_id,
    total_profit_contribution: data.total_profit_contribution,
    remaining_balance: data.remaining_balance || 0,
    payments: [],
    additional_config: {},
  };
  if (data.payments && data.payments.length !== 0) {
    loan.payments = data.payments.map(
      (payment: any) => ({
        id: payment.id,
        month: payment.month ?? '',
        year: payment.year,
        week: payment.week ?? '',
        period: payment.period,
        amount: payment.amount,
        paid_on_time: true,
        date_of_payment: helpers.formatDate(payment.date),
        previous_balance: payment.previous_balance,
        new_balance: payment.new_balance,
        from_previous_loan: true,
      })
    );
  }
  loan.amount_paid_to_date = data.amount_returned;
  loan.remaining_balance = data.remaining_balance;
  return loan;
}
