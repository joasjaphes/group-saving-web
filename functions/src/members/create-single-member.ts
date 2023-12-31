import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : {name; phoneNumber, memberName, groupName, groupId  }
 */
export const createSingleMember = functions.https.onRequest((request, response) => {
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
      const batch = admin.firestore().batch();
      const last_update = new Date().getTime();
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      const memberId = helpers.makeid();
      const groupMemberId = helpers.makeid();
      const memberDocRef = admin.firestore().doc(`groups/${groupId}/members/${memberId}`);
      const groupMemberDocRef = admin.firestore().collection('member_group').doc(groupMemberId);
      const memberMetadata = getMemberMetadata(data, groupId, memberId, last_update);
      const memberGroupMetadata = getMemberGroupMetadata(data, groupId, memberId, last_update, data?.memberName, groupMemberId, data?.groupName);
      batch.set(memberDocRef, memberMetadata);
      batch.set(groupMemberDocRef, memberGroupMetadata);
      batch.update(otherUpdateAtRef, {member_group: last_update, member_updated: last_update});
      await batch.commit();
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});

function getMemberGroupMetadata(data: any, groupId: string, memberId: string, last_update: number, memberName: string, groupMemberId: string, groupName: string) {
  return {
    id: groupMemberId,
    member_id: memberId,
    group_id: groupId,
    group_name: groupName,
    member_name: data?.name,
    user_id: null,
    phone_number: data?.phoneNumber,
    last_update,
    created_by: memberName,
    activation_status: 'active',
    alternative_phone_number: '',
  };
}

function getMemberMetadata(data: any, groupId: string, memberId: string, last_update: number) {
  return {
    id: memberId,
    group_id: groupId,
    is_active: true,
    last_update,
    name: data?.name,
    email: `${data?.phoneNumber}@monitafrica.com`,
    phone_number: data?.phoneNumber,
    alternative_phone_number: '',
    gender: '',
    date_joined: '',
    can_edit: false,
    permissions: {},
    additional_config: {},
  };
}
