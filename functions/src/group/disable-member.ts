import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const cors = require("cors")({ origin: true })

export const disableMember = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (request.method !== 'POST') {
      if (request.method !== 'OPTIONS') {
        response.status(400).send({ data: 'Please send a POST request' });
        return;
      }
    }

    try {
      const memberData = request.body

      const groupSelected = admin.firestore().collection("member_group").where('phone_number', '==', memberData?.phoneNumber).where("group_id", "==", memberData?.group_id)

      await groupSelected.get().then((data) => {
        if (data.docs.length > 0) {
          data.forEach((doc) => {
            admin.firestore().collection("member_group").doc(doc.id).update({ activation_status: memberData?.status });
            response.status(200).send({ data: 'Success' });
            console.log("It's Touched")
          });
        } else {
          response.status(401).send("Data Not found")
        }

      })

    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({ data: 'Fail' });
    }
  });

});