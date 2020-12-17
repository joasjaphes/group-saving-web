import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { groupId  }
 */
export const updateNeedToAddMember = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        response.status(400).send('Please send a POST request');
        return;
    }
    return cors(request, response, async () => {
        const data = request.body;
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
            batch.update(groupDocRef, { installation_step: 'SECOND', last_update });
            batch.update(otherUpdateAtRef, { group_updated: last_update  });
            await batch.commit();
            response.status(200).send('Success');
        } catch (e) {
            console.log('Error fetching user data:', e);
            response.status(500).send('Fail');
        }

    });

});
