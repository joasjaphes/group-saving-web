import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as helpers from '../helpers';
const cors = require('cors')({ origin: true });

export const getUserGroupsByPhoneNumber = functions.https.onRequest(
  (request, response) => {
    if (request.method !== 'POST') {
      if (request.method !== 'OPTIONS') {
        response.status(400).send('Please send a POST request');
        return;
      }
    }

    return cors(request, response, async () => {
      const data = request.body;
      const tokenId = request.get('Authorization')?.split('Bearer ')[1];
      if (tokenId !== helpers.token) {
        response.status(400).send('Invalid token please send a valid token');
        return;
      }
      admin
        .firestore()
        .collection('member_group')
        .where('phone_number', '==', data?.phoneNumber)
        .get()
        .then((querySnapshot) => {
          const userGroups = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          response.status(200).send(userGroups);
        })
        .catch((e) => {
          console.log('Error fetching user data:', e);
          response.status(500).send('Fail');
        });
    });

    // return cors(request, response, async () => {
    //   response.header('Access-Control-Allow-Origin', '*');
    //   response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    //   const data = request.body;
    //   let userGroups = [];
    //   console.log(data);
    //   console.log(request.get('Authorization'));
    //   const tokenId = request.get('Authorization')?.split('Bearer ')[1];
    //   if (tokenId !== helpers.token) {
    //     response.status(400).send('Invalid token please send a valid token');
    //     return;
    //   }
    //   admin
    //     .firestore()
    //     .collection('member_group')
    //     .where('phone_number', '==', data?.phoneNumber)
    //     .get()
    //     .then((querySnapshot) => {
    //       userGroups = querySnapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
    //       }));
    //       response.status(200).send(userGroups);
    //     })
    //     .catch((e) => {
    //       console.log('Error fetching user data:', e);
    //       response.status(500).send('Fail');
    //     });
    //   // response.status(200).send('Reached');
    // });
  }
);
