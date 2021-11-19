import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';
import {PaymentModel} from '../data-models/payment.model';

const cors = require('cors')({origin: true});

/**
 * input data : { groupId, memberId,  period }
 */
export const deleteContribution = functions.https.onRequest((request, response) => {
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
      const paymentDocRef = admin.firestore().doc(`groups/${data.groupId}/payments/period_${data.period}`);

      await admin.firestore().runTransaction(async (transaction) => {
        const groupDoc = await transaction.get(groupDocRef);
        const paymentDoc = await transaction.get(paymentDocRef);
        const groupData: any = {...groupDoc.data()};
        if (paymentDoc.exists) {
          const existingPaymentData = paymentDoc.data() as PaymentModel;
          transaction.update(groupDocRef, { ...groupData , last_update});
          transaction.set(paymentDocRef, {...existingPaymentData, last_update}, {merge: true});
          transaction.set(otherUpdateAtRef, {
            group_updated: last_update,
            payments_updated: last_update,
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
