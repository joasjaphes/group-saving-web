import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { groupId, memberId,  amount, date, month, year, loanTypeId }
 */
export const createLoanQueue = functions.https.onRequest((request, response) => {
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
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      const groupDocRef = admin.firestore().doc(`groups/${groupId}`);
      await admin.firestore().runTransaction(async (transaction) => {
        const groupDoc = await transaction.get(groupDocRef);
        const groupData: any = {...groupDoc.data()};
        const loanQueueId = data.id ? data.id : helpers.makeid();
        const old_loan_queue = groupData.loan_queue || [];
        const expense: any = prepareLoanQueueData(data, last_update, loanQueueId);
        const loan_queue = [expense, ...old_loan_queue];
        transaction.update(groupDocRef, {...groupData, loan_queue, last_update});
        transaction.set(otherUpdateAtRef, {group_updated: last_update}, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error adding member to loan queue:', e);
      response.status(500).send({data: 'Fail'});
    }
  });

});

function prepareLoanQueueData(data: any, last_update: any, loanQueueId: string) {
  return {
    id: loanQueueId,
    group_id: data.groupId,
    amount: data.amount,
    member_id: data.memberId,
    loan_type_id: data.loanTypeId,
    date: helpers.formatDate(data.date),
    month: helpers.getMonth(data.date),
    additional_config: {},
    year: helpers.getYear(data.date),
  };
}
