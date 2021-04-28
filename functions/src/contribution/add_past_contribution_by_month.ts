import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';
import {PaymentModel} from '../data-models/payment.model';

const cors = require('cors')({origin: true});

/**
 * input data : { frequency, groupId, fistTime  }
 */
export const addPastContributions = functions.https.onRequest((request, response) => {
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
        const payments: { [id: string]: PaymentModel } = {};
        for (const memberData of data.membersData) {
          let existingPaymentData: PaymentModel = payments[memberData.period];
          if (!existingPaymentData) {
            const paymentDocRef = admin.firestore().doc(`groups/${groupId}/payments/period_${memberData.period}`);
            const paymentDoc = await transaction.get(paymentDocRef);
            existingPaymentData = paymentDoc.exists ? paymentDoc.data() as PaymentModel : helpers.prepareEmptyPayment(memberData, groupData);
          }
          payments[memberData.period] = helpers.preparePayment(memberData, groupData, existingPaymentData);
        }
        for (const key of Object.keys(payments)) {
          const paymentRef = admin.firestore().doc(`groups/${data.groupId}/payments/${key}`);
          transaction.set(paymentRef, {...payments[key], last_update});
        }
        transaction.set(otherUpdateAtRef, {payments_updated: last_update}, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});

