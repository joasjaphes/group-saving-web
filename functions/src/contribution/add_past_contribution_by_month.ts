import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

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
        data.membersData.forEach((memberData: any) => {
          const paymentRef = admin.firestore().doc(`groups/${data.groupId}/payments/${helpers.makeid()}`);
          const paymentData = preparePayment(memberData, groupData);
          transaction.set(paymentRef, {...paymentData, last_update});
        });
        transaction.set(otherUpdateAtRef, {payments_updated: last_update }, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});

function preparePayment(data: any, group: any) {
  return {
    id: helpers.makeid(),
    ...data,
    year: group.track_contribution_period ? data.year : helpers.getYear(data.date),
    month: group.track_contribution_period ? data.month : helpers.getMonth(data.date),
    date: helpers.formatDate(data.date),
  };
}
