import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : {name; phoneNumber, memberName, groupName, groupId  }
 */
export const updateSingleMember = functions.https.onRequest((request, response) => {
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
      const batch = admin.firestore().batch();
      const last_update = new Date().getTime();
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      const memberId = data.memberId;
      const memberDocRef = admin.firestore().doc(`groups/${groupId}/members/${memberId}`);
      // const groupMemberDocRef = admin.firestore().collection('member_group').doc(groupMemberId);
      await admin.firestore().runTransaction(async (transaction) => {
        const memberDoc = await transaction.get(memberDocRef);
        const memberData: any = {...memberDoc.data()};
        const groupMemberRef = await admin.firestore()
          .collection('member_group')
          .where('phone_number', '==', data.phoneNumber)
          .get();
        if (groupMemberRef && groupMemberRef.docs) {
          groupMemberRef.docs.forEach(doc => {
            if (doc.data()) {
              const groupMemberDocRef = admin.firestore().collection('member_group').doc(doc.id);
              transaction.update(groupMemberDocRef, {last_update, member_name: data.name});
            }
          });
        }
        transaction.update(memberDocRef, {...memberData, last_update, name: data.name, email: data.email });
        transaction.set(otherUpdateAtRef, { group_updated: last_update }, {merge: true});
      });
      response.status(200).send({data: 'Success'});
      batch.update(otherUpdateAtRef, {member_group: last_update, member_updated: last_update});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }
  });
});
