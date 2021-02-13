import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { frequency, groupId, fistTime  }
 */
export const updateMeeting = functions.https.onRequest((request, response) => {
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
      await admin.firestore().runTransaction(async (transaction) => {
        const next_meeting: any = prepareMeetingDetails(data);
        const meetingRef = admin.firestore().doc(`groups/${data.groupId}/meeting/${next_meeting.id}`);
        transaction.set(meetingRef, {...next_meeting, last_update}, {merge: true});
        transaction.set(otherUpdateAtRef, {group_updated: last_update, meeting_updated: last_update}, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error setting next meeting data:', e);
      response.status(500).send({data: 'Fail'});
    }
  });
});

function prepareMeetingDetails(data: any) {
  return {
    group_id: data.groupId,
    id: data.id ? data.id : helpers.makeid(),
    date: helpers.formatDate(data.date),
    month: helpers.getMonth(data.date),
    year: helpers.getYear(data.date),
    place: data.place,
    attendance: data.attendance,
    notes: data.notes || null,
    additional_config: {},
  };
}
