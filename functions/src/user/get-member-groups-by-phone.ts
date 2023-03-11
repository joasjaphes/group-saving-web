import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as helpers from '../helpers';
const cors = require('cors')({origin: true});

export const getUserGroupsByPhoneNumber = functions.https.onRequest((request, response) => {
  if (request.method !== 'POST'){
    response.status(400).send('Please send a POST request');
    return;
  }
  return cors(request, response, () => {
    const data = request.body;
    let userGroups = [];
    console.log(data);
    console.log(request.get('Authorization'));
    const tokenId = request.get('Authorization')?.split('Bearer ')[1];
    if ( tokenId !== helpers.token) {
      response.status(400).send('Invalid token please send a valid token');
      return;
    }
    admin.firestore().collection('member_group')
    .where('phone_number', '==', data?.phoneNumber)
    .get()
    .then((querySnapshot) => {
      userGroups = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      response.status(200).send(userGroups);
    })
    .catch(e => {
      console.log('Error fetching user data:', e);
      response.status(500).send('Fail');
    });
    // const tokenId = request.get('Authorization').split('Bearer ')[1];
    // if ( tokenId !== helpers.token) {
    //   response.status(400).send('Invalid token please send a valid token');
    //   return;
    // }
    // admin.auth().getUserByPhoneNumber(data.phoneNumber)
    //   .then(function(userRecord) {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log("Successfully fetched user data:", userRecord.toJSON());
    //     response.status(200).send(userRecord.toJSON());
    //   })
    //   .catch(function(error) {
    //     console.log("Error fetching user data:", error);
    //     response.status(500).send("Fail");
    //   });
  });

});
