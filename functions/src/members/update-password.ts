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
      const userRecords = await admin
        .auth()
        .getUserByPhoneNumber(data.phoneNumber);
      await admin.auth().updateUser(userRecords.uid, {
        email: userRecords.email,
        emailVerified: userRecords.emailVerified,
        password: data.password,
      });
      response.status(200).send({ data: 'Success' });
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({ data: 'Fail' });
    }
  });
});
