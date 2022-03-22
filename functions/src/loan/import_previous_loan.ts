import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';
import {LoanModel, SingleLoanModel} from '../data-models/loan.model';
import {PaymentModel} from '../data-models/payment.model';

const cors = require('cors')({origin: true});
/**
 * input data : { groupId, loans: {memberId, }  }
 */
export const importLoanFromExcel = functions.https.onRequest((request, response) => {
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
      await admin.firestore().runTransaction(async transaction => {
        const groupDoc = await transaction.get(groupDocRef);
        const groupData: any = {...groupDoc.data()};
        const loanItems: { [id: string]: SingleLoanModel } = {};
        const loanItemDetails: { [id: string]: LoanModel } = {};
        const memberItems: { [id: string]: any } = {};
        const payments: { [id: string]: PaymentModel } = {};
        for (const loan of data.loans) {
          const memberRef = admin.firestore().doc(`groups/${data.groupId}/members/${loan.memberId}`);
          const memberDoc = await transaction.get(memberRef);
          memberItems[loan.memberId] = {...memberDoc.data()};
          const loanId = loan.id ? loan.id : helpers.makeid();
          const loanTypeData: any = groupData.loanTypes[loan.loanUsed];
          loanItems[loanId] = helpers.prepareLoan(loanId, loan, loanTypeData, last_update);
          if (parseInt(loanItems[loanId].remaining_balance + '', 10) === 0) {
            const id = `member_${loan.memberId}`;
            if (!loanItemDetails[id]) {
              const loanRef = admin.firestore().doc(`groups/${data.groupId}/loans/${id}`);
              const loanDoc = await transaction.get(loanRef);
              loanItemDetails[id] = loanDoc.exists ? loanDoc.data() as LoanModel : helpers.prepareEmptyLoan({
                memberId: loan.memberId,
              }, groupData);
            }
            loanItemDetails[id].loans[loanId] = loanItems[loanId];
            if (memberItems[loan.memberId].active_loans && memberItems[loan.memberId].active_loans[loanId]) {
              memberItems[loan.memberId].active_loans = Object.keys(memberItems[loan.memberId].active_loans).reduce((object: any, key: string) => {
                if (key !== loanId) {
                  object[key] = memberItems[loan.memberId].active_loans[key];
                }
                return object;
              }, {});
            }
          }

          if (loan.payments.length > 0) {
            for (const payment of loan.payments) {
              let existingPaymentData: PaymentModel = payments[`period_${payment.period}`];
              if (!existingPaymentData) {
                const paymentDocRef = admin.firestore().doc(`groups/${groupId}/payments/period_${payment.period}`);
                const paymentDoc = await transaction.get(paymentDocRef);
                existingPaymentData = paymentDoc.exists ? paymentDoc.data() as PaymentModel : helpers.prepareEmptyPayment(payment, groupData);
              }
              payments[`period_${payment.period}`] = helpers.preparePayment({
                ...payment,
                date: payment.date_of_payment,
                memberId: loan.memberId,
                fines: {},
                contributions: {},
                startingAmount: {},
                loans: {
                  [loanId]: payment.amount,
                },
              }, groupData, existingPaymentData, false, true);
            }
          }

        }
        if (Object.keys(loanItemDetails).length > 0) {
          for (const loanKey of Object.keys(loanItemDetails)) {
            const loanRef = admin.firestore().doc(`groups/${data.groupId}/loans/${loanKey}`);
            transaction.set(loanRef, {...loanItemDetails[loanKey], last_update }, {merge: true});
            transaction.set(otherUpdateAtRef, {  loan_updated: last_update }, {merge: true});
          }

        }
        if (Object.keys(loanItems).length > 0) {
          for (const loanKey of Object.keys(loanItems)) {
            const loanItem = loanItems[loanKey];
            const memberData = memberItems[loanItem.member_id];
            const memberRef = admin.firestore().doc(`groups/${data.groupId}/members/${loanItem.member_id}`);
            if (parseInt(loanItem.remaining_balance + '', 10) === 0) {
                transaction.update(memberRef, {...memberData, last_update});
                transaction.set(otherUpdateAtRef, {member_updated: last_update}, {merge: true});
            } else {
              if (memberData.active_loans) {
                memberData.active_loans[loanItem.id] = loanItem;
              } else {
                memberData.active_loans = {};
                memberData.active_loans[loanItem.id] = loanItem;
              }
              transaction.update(memberRef, {...memberData, last_update});
              transaction.set(otherUpdateAtRef, {member_updated: last_update}, {merge: true});
            }
          }

        }


        if (Object.keys(payments).length > 0) {
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
