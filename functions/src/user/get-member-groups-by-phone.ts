import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const cors = require('cors')({origin: true});

export const getUserGroupsByPhoneNumber = functions.https.onRequest((request, response) => {
  if (request.method !== 'POST'){
    response.status(400).send('Please send a POST request');
    return;
  }
  return cors(request, response, () => {
    const data = request.body;
    console.log(data);
    console.log(request.get('Authorization'));
    const fireStoreData = admin.firestore().collection('member_group').get();
    fireStoreData.then(snapshot => response.send(snapshot.docs))
    .catch(e => response.status(500).send('failed'));
    response.status(200).send('Success');
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
