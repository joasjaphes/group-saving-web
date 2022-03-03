import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { phoneNumber, photoURL, path  }
 */
export const updateMemberProfilePicture = functions.https.onRequest((request, response) => {
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
      const last_update = new Date().getTime();


      await admin.firestore().runTransaction(async (transaction) => {
        const filePaths: string[] = [];
        const groupMemberRef = await admin.firestore()
          .collection('member_group')
          .where('phone_number', '==', data.phoneNumber)
          .get();
        const memberItems: { [id: string]: any } = {};
        if (groupMemberRef && groupMemberRef.docs) {
          for (const doc of groupMemberRef.docs) {
            if (doc.data()) {
              const memberGroupDoc = doc.data();
              const memberDocRef = admin.firestore().doc(`groups/${memberGroupDoc.group_id}/members/${memberGroupDoc.member_id}`);
              const memberDoc = await transaction.get(memberDocRef);
              const memberData: any = {...memberDoc.data()};
              if (!!memberData.path) {
                filePaths.push(memberData.path)
              }
              memberItems[memberGroupDoc.member_id] = {...memberData, last_update, profile_picture: data.photoURL, path: data.path };
            }
          }

        }
        if (Object.keys(memberItems).length > 0) {
          for (const key of Object.keys(memberItems)) {
            const memberData: any = {...memberItems[key]};
            const memberDocRef = admin.firestore().doc(`groups/${memberData.group_id}/members/${key}`);
            const otherUpdateAtRef = admin.firestore().doc(`groups/${memberData.group_id}/updated/others`);
            transaction.update(memberDocRef, {...memberData });
            transaction.set(otherUpdateAtRef, { member_updated: last_update }, {merge: true});
          }
        }

        try {
          const userRecords =  await admin.auth().getUserByPhoneNumber(data.phoneNumber);
          await admin.auth().updateUser(userRecords.uid, {
            photoURL: data.photoURL,
          });
        } catch (e) {
          console.log('There is no user with this phone number');
        }
        if(filePaths.length > 0) {
          for (const path of filePaths) {
            try {
              const bucket = admin.storage().bucket();
              await bucket.file(path).delete();
            } catch (e) {
              console.log('There is no file to delete');
            }
          }
        }
      });

      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }
  });
});
