import * as functions from 'firebase-functions';
//import * as admin from 'firebase-admin';
import * as helpers from '../helpers';

const cors = require('cors')({origin: true});

export const resetPassword = functions.https.onRequest((request, response) => {
    return cors(request, response, async () => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
      if (request.method !== 'POST') {
        if (request.method !== 'OPTIONS') {
          response.status(400).send('Please send a POST request');
          return;
        }
      }
      //const data = request.body;
      try {
          let results = await helpers.sendSMS({
              phoneNumbers: ["255718026490"],
              message: "Message"
          })
        console.log("Results:", results.data);
        response.status(200).send(results.data);
      } catch (e) {
        console.log('Error fetching user data:', e);
        response.status(500).send('Fail');
      }
  
    });
  
  });