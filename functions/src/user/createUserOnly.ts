import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as helpers from '../helpers';
import UserRecord = admin.auth.UserRecord;

const cors = require('cors')({origin: true});

/**
 * input data : {email, phoneNumber, password, name,memberName,groupName,numberOfMembers,countryCode  }
 */
export const createUserOnly = functions.https.onRequest((request, response) => {
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
      const memberGroupRef: FirebaseFirestore.Query = admin.firestore().collection('member_group')
        .where('phone_number', '==', data?.phoneNumber);
      const userData: UserRecord = await admin.auth().createUser({
        email: data?.email,
        emailVerified: true,
        phoneNumber: data?.phoneNumber,
        password: data?.password,
        displayName: data?.name,
        disabled: false,
      });
      await updateMemberGroup(memberGroupRef, data, userData);
      response.status(200).send(userData.toJSON());
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send('Fail');
    }
  });
});

function updateMemberGroup(memberGroupRef: FirebaseFirestore.Query, data: any, userData: UserRecord): Promise<any> {
  return memberGroupRef.get().then((groupDoc) => {
    const batch = admin.firestore().batch();
    const last_update = new Date().getTime();

    groupDoc.docs.forEach(doc => {
      const otherUpdateAtRef = admin.firestore().doc(`groups/${doc.data()?.group_id}/updated/others`);
      const docRef = admin.firestore().collection('member_group').doc(doc.id);
      batch.update(docRef, {
        member_name: data?.name,
        user_id: userData.uid,
        phone_number: data?.phoneNumber,
        last_update,
      });
      batch.update(otherUpdateAtRef, {member_group: last_update}, );
    });
    return batch.commit();
  });
}

