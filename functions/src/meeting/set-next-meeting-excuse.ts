import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { memberId, groupId, excuse  }
 */
export const setNextMeetingExcuse = functions.https.onRequest((request, response) => {
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
        const next_meeting = groupData.next_meeting
          ? {
            ...groupData.next_meeting,
            excuses: {
              [data.memberId]: data.excuse,
            },
          }
          : {
            meeting_date: helpers.formatDate(data.meetingDate),
            meeting_place: data.meetingPlace,
            excuses: {
              [data.memberId]: data.excuse,
            },
          };
        transaction.update(groupDocRef, {...groupData, last_update, next_meeting });
        transaction.set(otherUpdateAtRef, { group_updated: last_update }, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error setting next meeting excuse:', e);
      response.status(500).send({data: 'Fail'});
    }
  });
});
