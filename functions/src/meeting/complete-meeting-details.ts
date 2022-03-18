import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';
import {MeetingModel, SingleMeeting} from '../data-models/meeting.model';

const cors = require('cors')({origin: true});

/**
 * input data : { frequency, groupId, fistTime  }
 */
export const completeMeeting = functions.https.onRequest((request, response) => {
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
        const next_meeting: any = prepareMeetingDetails(data, groupData.next_meeting);
        const meetingRef = admin.firestore().doc(`groups/${data.groupId}/meeting/period_${next_meeting.year}`);
        const meetingDoc = await transaction.get(meetingRef);
        const existingMeeting: MeetingModel = meetingDoc.exists ? meetingDoc.data() as MeetingModel : {
          id: `period_${next_meeting.year}`,
          year: next_meeting.year,
          group_id: data.groupId,
          meetings: {},
        };
        existingMeeting.meetings[next_meeting.id] = next_meeting;
        transaction.update(groupDocRef, { next_meeting: null, last_update });
        transaction.set(meetingRef, { ...existingMeeting, last_update });
        transaction.set(otherUpdateAtRef, { group_updated: last_update, meeting_updated: last_update }, {merge: true});
      }).then(() => {
        helpers.sendNotification({
          groupId: data.groupId,
          title: `${data.groupName}: Meeting has just been finished`,
          body: `Meeting has just been finished on ${helpers.prettyDate(data.date)} at ${data.place}, ${data.attendance.length} members participated`,
          type: 'new_contribution',
          id: 'new_contribution',
        }).then(() => null)
          .catch((error) => console.log(error));
      });

      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error setting next meeting data:', e);
      response.status(500).send({data: 'Fail'});
    }
  });
});

function prepareMeetingDetails(data: any, nextMeeting: any): SingleMeeting {
  let meeting: SingleMeeting;
  if (nextMeeting) {
    meeting = {
      ...nextMeeting,
      group_id: data.groupId,
      id: nextMeeting.id ? nextMeeting.id : helpers.makeid(),
      date: helpers.formatDate(data.date),
      month: helpers.getMonth(data.date),
      year: helpers.getYear(data.date) + '',
      week: '',
      place: data.place,
      attendance: data.attendance,
      missed: data.missed ?? [],
      notes: data.notes || '',
      excuses: data.excuses ?? {},
      meetingPhoto: data.fileUrl ?? '',
      additional_config: {},
      place_location_url: data.place_location_url ?? '',
      latitude: data.latitude ?? '',
      longitude: data.longitude ?? '',
    };
  } else {
    meeting = {
      attendance: data.attendance,
      missed: data.missed ?? [],
      date: helpers.formatDate(data.date),
      excuses: data.excuses ?? {},
      id: helpers.makeid(),
      is_set: true,
      month: helpers.getMonth(data.date),
      notes: data.notes || '',
      week: '',
      year: helpers.getYear() + '',
      place: data.place,
      reasons: null,
      meetingPhoto: data.fileUrl ?? '',
      additional_config: {},
      place_location_url: data.place_location_url ?? '',
      latitude: data.latitude ?? '',
      longitude: data.longitude ?? '',
    };
  }
  return meeting;
}
