import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as helpers from '../helpers';
import UserRecord = admin.auth.UserRecord;
const cors = require('cors')({origin: true});

export const getUserByPhoneNumber = functions.https.onRequest((request, response) => {
  if (request.method !== 'POST') {
    if (request.method !== 'OPTIONS') {
      response.status(400).send('Please send a POST request');
      return;
    }
  }
  return cors(request, response, async () => {
    const data = request.body;
    const tokenId = request.get('Authorization')?.split('Bearer ')[1];
    if ( tokenId !== helpers.token) {
      response.status(400).send('Invalid token please send a valid token');
      return;
    }
    let userRecord = null;
    let userData = null;
    admin.auth().getUserByPhoneNumber(data.phoneNumber).then((user: UserRecord) => {
      userRecord = user.toJSON();
      response.status(200).send({userRecord, userData: null});
    }).catch(error => {
      console.log('message', error.message);
      if (error.message.indexOf('There is no user record corresponding to the provided identifier') !== -1 ) {
        admin.firestore().collection('member_group')
            .where('phone_number', '==', data?.phoneNumber)
            .get()
            .then((querySnapshot) => {
              userData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
              response.status(200).send({userRecord: null, userData});
            })
            .catch(e => {
              console.log('Error fetching user data:', e);
              response.status(500).send('Fail');
            });
      } else {
        console.log('Error fetching user data:', error);
        response.status(500).send('Fail');
      }
    });
  });

});
