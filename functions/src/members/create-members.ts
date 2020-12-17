import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : {members: {name; phoneNumber}[], memberName, groupName, groupId, expectedNumberOfMembers, currentNumberOfMembers, isInitial  }
 */
export const createMembers = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        response.status(400).send('Please send a POST request');
        return;
    }
    return cors(request, response, async () => {
        const data = request.body;
        console.log(request.get('Authorization'));
        const tokenId = request.get('Authorization')?.split('Bearer ')[1];
        if (tokenId !== helpers.token) {
            response.status(400).send('Invalid token please send a valid token');
            return;
        }
        try {
            const groupId = data.groupId;
            const batch = admin.firestore().batch();
            const last_update = new Date().getTime();
            const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
            const groupDocRef = admin.firestore().doc(`groups/${groupId}`);
            data.members.forEach((member: any) => {
                const memberId = helpers.makeid();
                const groupMemberId = helpers.makeid();
                const memberDocRef = admin.firestore().doc(`groups/${groupId}/members/${memberId}`);
                const groupMemberDocRef = admin.firestore().collection('member_group').doc(groupMemberId);
                const memberMetadata = getMemberMetadata(member, groupId, memberId, last_update);
                const memberGroupMetadata = getMemberGroupMetadata(member, groupId, memberId, last_update, data?.memberName, groupMemberId, data?.groupName);
                batch.set(memberDocRef, memberMetadata);
                batch.set(groupMemberDocRef, memberGroupMetadata);
            });
            batch.update(groupDocRef, { installation_step: 'SECOND', last_update });
            batch.update(otherUpdateAtRef, { member_group: last_update, group_updated: last_update, member_updated: last_update  });
            await batch.commit();
            response.status(200).send('Success');
        } catch (e) {
            console.log('Error fetching user data:', e);
            response.status(500).send('Fail');
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
        gender: '',
        date_joined: '',
        can_edit: true,
        permissions: {},
        additional_config: {},
    };
}
