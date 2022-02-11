import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { groupId, fineId,  memberId }
 */
export const deleteExpectedFine = functions.https.onRequest((request, response) => {
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
      const expenseRef = admin.firestore().doc(`groups/${groupId}/expected_fines/expected_${data.memberId}`);
      await admin.firestore().runTransaction(async (transaction) => {
        const expenseDoc = await transaction.get(expenseRef);
        if (expenseDoc.exists) {
          const expenseData: any = expenseDoc.data();
          const newFines = expenseData.fines ? expenseData.fines.filter((i: any) => i.id !== data.fineId) : [];
          const newExpenseData = {
            ...expenseData,
            fines: newFines,
          }
          transaction.set(expenseRef, {...newExpenseData, last_update});
          transaction.set(otherUpdateAtRef, {
            expected_fines_updated: last_update,
          }, {merge: true});
        }
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }
  });

});
