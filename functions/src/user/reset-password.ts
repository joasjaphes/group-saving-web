import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as helpers from '../helpers';

const cors = require('cors')({ origin: true });

const codeSMS = `Your Group Savings Code is {}`;
function generateRandomNumber() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}
export const requestResetPassword = functions.https.onRequest(
  (request, response) => {
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
      console.log('DATA', data);
      let user;
      try {
        user = await admin.auth().getUserByPhoneNumber(data.phoneNumber);
      } catch (e) {
        console.log('Error Code:', e.code);
        console.log('Error fetching user data:', e);
        response.status(500).send({
          error: true,
          code: e.code,
          message: e.message,
        });
      }
      console.log('USER', user);
      try {
        let code = generateRandomNumber().toString();
        let results = await helpers.sendSMS({
          phoneNumber: data.phoneNumber,
          message: codeSMS.replace('{}', code),
        });
        var db = admin.database();
        var ref = db.ref('/user_auth_code');
        let obj: any = {};
        obj[data.phoneNumber] = code;
        ref.set(obj);
        response.status(200).send(results.data.messages[0]);
      } catch (e) {
        console.log('Error fetching user data:', e);
        response.status(500).send({
          error: true,
          code: e.code,
          message: e.message,
        });
      }
    });
  }
);
export const validateResetPasswordCode = functions.https.onRequest(
  (request, response) => {
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
      try {
        var db = admin.database();
        var ref = db.ref('/user_auth_code/' + data.phoneNumber);
        let snapshot = await ref.once('value');
        console.log('Data:', snapshot.val());
        console.log('Sending Data:');
        if (snapshot.val() === data.code) {
          response.status(200).send({
            valid: true,
          });
        } else {
          response.status(500).send({
            error: true,
            code: 'auth/invalid-reset-code',
            message: 'The reset code is invalid',
          });
        }
      } catch (e) {
        console.log('Error Code:', e.code);
        console.log('Error fetching user data:', e);
        response.status(500).send({
          error: true,
          code: e.code,
          message: e.message,
        });
      }
    });
  }
);
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
    const data = request.body;
    try {
      var db = admin.database();
      var ref = db.ref('/user_auth_code/' + data.phoneNumber);
      let snapshot = await ref.once('value');
      console.log('Data:', snapshot.val());
      console.log('Sending Data:');
      if (snapshot.val() !== data.code) {
        response.status(500).send({
          error: true,
          code: 'auth/invalid-reset-code',
          message: 'The reset code is invalid',
        });
        return;
      }
      let user = await admin.auth().getUserByPhoneNumber(data.phoneNumber);
      await admin.auth().updateUser(user.uid, {
        password: data.password,
      });
      response.status(200).send({
        status:"OK",
        message: 'Password changed successfully',
      });
    } catch (e) {
      console.log('Error Code:', e.code);
      console.log('Error fetching user data:', e);
      response.status(500).send({
        error: true,
        code: e.code,
        message: e.message,
      });
    }
  });
});
