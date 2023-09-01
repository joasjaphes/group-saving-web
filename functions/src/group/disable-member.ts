import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const cors = require("cors")({ origin: true })

export const disableMember = functions.https.onRequest((request, response) => {

  return cors(request, response, async () => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (request.method !== "POST") {
      response.status(400).send("Please send a POST request");
    } else {
      const memberData = request.body;

      admin
        .firestore()
        .collection('member_group')
        .where('phone_number', '==', memberData?.phoneNumber).where("group_id", "==", memberData?.group_id)
        .get()
        .then((querySnapshot) => {
          console.log('data fetched', JSON.stringify(querySnapshot))           
          querySnapshot.forEach((doc) =>{
            admin
              .firestore()
              .collection('member_group').doc(doc.id).update({ activation_status: memberData?.status })
              console.log(`Data updated ${JSON.stringify(memberData)}`);
              response.status(200).send("Data Updated Successfully");
            
          }
          );
          //   admin.firestore().
         
        })
        .catch((e) => {
          console.log('Error fetching user data:', e);
          response.status(500).send('Fail');
        });
    }
  })

});