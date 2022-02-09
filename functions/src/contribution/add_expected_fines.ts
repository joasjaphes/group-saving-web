import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';
import {ExpectedFineModel} from '../data-models/expected-fine.model';
const cors = require('cors')({origin: true});

/**
 * input data : { groupId, month, year, period, memberId, fineAmounts}
 */
export const addExpectedFines = functions.https.onRequest((request, response) => {
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
      const last_update = new Date().getTime();
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      const groupDocRef = admin.firestore().doc(`groups/${groupId}`);
      await admin.firestore().runTransaction(async (transaction) => {
        const groupDoc = await transaction.get(groupDocRef);
        const groupData: any = {...groupDoc.data()};

        // Prepare payment data and merge them into a correct period
        const paymentDocRef = admin.firestore().doc(`groups/${data.groupId}/expected_fines/expected_${data.memberId}`);
        const paymentDoc = await transaction.get(paymentDocRef);
        const existingPaymentData = paymentDoc.exists ? paymentDoc.data() as ExpectedFineModel : {id: `expected_${data.memberId}`, fines: []};
        const paymentData = helpers.prepareExpectedFine(data, groupData, existingPaymentData, false);
        transaction.set(paymentDocRef, {...paymentData, last_update}, {merge: true});
        transaction.set(otherUpdateAtRef, {
          expected_fines_updated: last_update,
        }, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }
  });
});
