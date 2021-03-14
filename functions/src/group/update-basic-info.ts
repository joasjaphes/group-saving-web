import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { groupId,  frequency, currency, has_entry_fee, has_social, has_other_contribution, has_share, entry_fee_amount }
 */
export const updateBasicInfo = functions.https.onRequest((request, response) => {
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
        // If the name of the group has been updated change the group name in all members
        if (groupData.group_name !== data.group_name) {
          const groupMemberRef = await admin.firestore()
            .collection('member_group')
            .where('group_id', '==', groupId)
            .get();
          if (groupMemberRef && groupMemberRef.docs) {
            groupMemberRef.docs.forEach(doc => {
              if (doc.data()) {
                const groupMemberDocRef = admin.firestore().collection('member_group').doc(doc.id);
                transaction.update(groupMemberDocRef, {last_update, group_name: data.group_name});
              }
            });
          }
        }
        const meeting_settings = groupData.meeting_settings
          ? {...groupData.meeting_settings, meeting_frequency: data.frequency}
          : {meeting_frequency: data.frequency};
        transaction.update(groupDocRef, {
          ...groupData,
          last_update,
          meeting_settings,
          group_name: data.group_name,
          currency: data.currency,
          contribution_frequency: data.frequency,
          currency_name: data.currency_name,
          track_contribution_period: data.track_contribution_period === 'Yes',
        });
        transaction.set(otherUpdateAtRef, { group_updated: last_update }, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error updating group information:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});
