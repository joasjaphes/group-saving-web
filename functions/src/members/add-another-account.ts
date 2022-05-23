import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : {memberId, groupId  }
 */
export const addAnotherAccount = functions.https.onRequest((request, response) => {
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
      const groupId = data.groupId;
      const last_update = new Date().getTime();
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      const memberId = data.memberId;
      const member1Id = helpers.makeid();
      const memberDocRef = admin.firestore().doc(`groups/${groupId}/members/${memberId}`);
      const member1DocRef = admin.firestore().doc(`groups/${groupId}/members/${member1Id}`);
      // const groupMemberDocRef = admin.firestore().collection('member_group').doc(groupMemberId);
      await admin.firestore().runTransaction(async (transaction) => {
        const memberDoc = await transaction.get(memberDocRef);
        const memberData: any = {...memberDoc.data()};
        const member1Metadata = setMemberData(memberData, groupId, member1Id, last_update, memberId) ;
        const groupMemberRef = await admin.firestore()
          .collection('member_group')
          .where('phone_number', '==', data.phoneNumber)
          .get();
        if (groupMemberRef && groupMemberRef.docs) {
          groupMemberRef.docs.forEach(doc => {
            if (doc.data()) {
              const groupData = doc.data();
              if (groupData.group_id === groupId) {
                const groupMemberDocRef = admin.firestore().collection('member_group').doc(doc.id);
                transaction.update(groupMemberDocRef, {last_update, number_of_accounts: 2});
              }
            }
          });
        }
        transaction.update(memberDocRef, {
          ...memberData,
          last_update,
          additional_config: {
            have_other_account: true,
            other_account_id: member1Id || '',
            second_account_id: '',
            is_primary: true,
          },
        });
        transaction.set(member1DocRef, member1Metadata);
        transaction.set(otherUpdateAtRef, { member_updated: last_update }, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }
  });
});


function setMemberData(
   data: any,
   groupId: string,
   memberId: string,
   last_update: number,
   member1id: string | null = null,
  ) {
  return {
    ...data,
    id: memberId,
    group_id: groupId,
    last_update,
    additional_config: {
      have_other_account: true,
        other_account_id: member1id || '',
        second_account_id: '',
        is_primary: false,
    },
  }
}
