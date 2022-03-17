import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { frequency, groupId, fistTime  }
 */
export const setNextMeeting = functions.https.onRequest((request, response) => {
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
            meeting_date: helpers.formatDate(data.meetingDate),
            meeting_place: data.meetingPlace,
            place_location_url: data.place_location_url ?? '',
            latitude: data.latitude ?? '',
            longitude: data.longitude ?? '',
            excuses: {},
          }
          : {
            meeting_date: helpers.formatDate(data.meetingDate),
            meeting_place: data.meetingPlace,
            place_location_url: data.place_location_url ?? '',
            latitude: data.latitude ?? '',
            longitude: data.longitude ?? '',
            excuses: {},
          };
        transaction.update(groupDocRef, {...groupData, last_update, next_meeting });
        transaction.set(otherUpdateAtRef, { group_updated: last_update }, {merge: true});
      });
      helpers.sendNotification({
        groupId: data.groupId,
        title: `${data.groupName}: Next Meeting is set`,
        body: `Next meeting will be on ${helpers.prettyDate(data.meetingDate)} at ${data.meetingPlace}`,
        type: 'new_contribution',
        id: 'new_contribution',
      }).then(() => null)
        .catch((error) => console.log(error));
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error setting next meeting data:', e);
      response.status(500).send({data: 'Fail'});
    }
  });
});
