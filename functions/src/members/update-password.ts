import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({ origin: true });

/**
 * input data : {name; phoneNumber, memberName, groupName, groupId  }
 */
export const updatePassword = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (request.method !== 'POST') {
      if (request.method !== 'OPTIONS') {
        response.status(400).send({ data: 'Please send a POST request' });
        return;
      }
    }
    const data = request.body;
    const tokenId = request.get('Authorization')?.split('Bearer ')[1];
    if (tokenId !== helpers.token) {
      response
        .status(400)
        .send({ data: 'Invalid token please send a valid token' });
      return;
    }
    try {
      const last_update = new Date().getTime();
      await admin.firestore().runTransaction(async (transaction) => {
        const groupMemberRef = await admin
          .firestore()
          .collection('member_group')
          .where('phone_number', '==', data.phoneNumber)
          .get();
        const userRecords = await admin
          .auth()
          .getUserByPhoneNumber(data.phoneNumber);
        await admin.auth().updateUser(userRecords.uid, {
          email: userRecords.email,
          emailVerified: userRecords.emailVerified,
          password: data.password,
        });
        if (groupMemberRef && groupMemberRef.docs) {
          groupMemberRef.docs.forEach((doc) => {
            const memberData = doc.data();
            if (memberData) {
              const otherUpdateAtRef = admin
                .firestore()
                .doc(`groups/${memberData.group_id}/updated/others`);
              const groupMemberDocRef = admin
                .firestore()
                .collection('member_group')
                .doc(doc.id);
              transaction.update(groupMemberDocRef, {
                last_update,
                should_reset_password: data.should_reset_password ??  true,
              });
              transaction.set(
                otherUpdateAtRef,
                { member_updated: last_update },
                { merge: true }
              );
            }
          });
        }
      });
      response
        .status(200)
        .send({ data: 'Success', last_update, dataObject: data });
    } catch (e) {
      console.log('Failed to update member passsword', e);
      response.status(500).send({ data: 'Fail' });
    }
  });
});
