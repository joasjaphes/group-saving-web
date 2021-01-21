import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { frequency, groupId, fistTime  }
 */
export const setMeetingDetails = functions.https.onRequest((request, response) => {
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
      const groupDocRef = admin.firestore().doc(`groups/${groupId}`);
      await admin.firestore().runTransaction(async (transaction) => {
        const groupDoc = await transaction.get(groupDocRef);
        const groupData: any = {...groupDoc.data()};
        const fine_types = groupData.fines ? Object.keys(groupData.fines).map(i => groupData.fines[i]) : [];
        const meeting_settings = groupData.meeting_settings
          ? {
            ...groupData.meeting_settings,
            meeting_frequency: data.frequency,
            must_attend: data.must_attend === 'Yes',
            allow_late_fine: data.allow_late_fine === 'Yes',
            allow_not_attending_fine: data.allow_not_attending_fine === 'Yes',
            late_fine_amount: data.late_fine_amount || 0,
            not_attending_fine_amount: data.not_attending_fine_amount || 0,
            late_fine_name: data.late_fine_name || null,
            not_attending_fine_name: data.not_attending_fine_name || null,
          }
          : {
            meeting_frequency: data.frequency,
            must_attend: data.must_attend === 'Yes',
            allow_late_fine: data.allow_late_fine === 'Yes',
            allow_not_attending_fine: data.allow_not_attending_fine === 'Yes',
            late_fine_amount: data.late_fine_amount || 0,
            not_attending_fine_amount: data.not_attending_fine_amount || 0,
            late_fine_name: data.late_fine_name || null,
            not_attending_fine_name: data.not_attending_fine_name || null,
          };
        if (data.allow_late_fine === 'Yes') {
          const fineToUse = fine_types.find(i => i.type === 'Meeting' && i.meeting_type === 'late');
          const fineId = fineToUse ? fineToUse.id : helpers.makeid();
          const fine = prepareMeetingFineData(fineId, data, fineToUse, last_update, 'late');
          if (groupData.fines) {
            groupData.fines[fineId] = fine;
          } else {
            groupData.fines = {[fineId]: fine};
          }
          // const fineDocRef = admin.firestore().doc(`groups/${groupId}/fine_type/${fineId}`);
          // transaction.set(fineDocRef, prepareMeetingFineData(fineId, data, fineToUse, last_update, 'late'), {merge: true});
        }
        if (data.allow_not_attending_fine === 'Yes') {
          const fineToUse = fine_types.find(i => i.type === 'Meeting' && i.meeting_type === 'not_attending');
          const fineId = fineToUse ? fineToUse.id : helpers.makeid();
          const fine = prepareMeetingFineData(fineId, data, fineToUse, last_update, 'not_attending');
          if (groupData.fines) {
            groupData.fines[fineId] = fine;
          } else {
            groupData.fines = {[fineId]: fine};
          }
          // const fineDocRef = admin.firestore().doc(`groups/${groupId}/fine_type/${fineId}`);
          // transaction.set(fineDocRef, prepareMeetingFineData(fineId, data, fineToUse, last_update, 'not_attending'), {merge: true});
        }
        transaction.update(groupDocRef, {...groupData, last_update, meeting_settings });
        transaction.set(otherUpdateAtRef, { group_updated: last_update }, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error updating meeting data:', e);
      response.status(500).send({data: 'Fail'});
    }
  });

});

function prepareMeetingFineData(fineId: string, data: any, fineData: any, last_update: any, name: string) {
  return {
    id: fineId,
    group_id: data.groupId,
    is_active: true,
    last_update,
    contribution_type_id: (name === 'late' ? data.add_late_fine_to : data.add_not_attending_fine_to) || null,
    loan_type_id: null,
    description: (name === 'late' ? data.late_fine_name : data.not_attending_fine_name) || '',
    calculation: 'Fixed',
    is_based_on_balance: false,
    is_based_on_amount_to_be_paid: false,
    balance_percentage: null,
    amount_to_be_paid_percentage: null,
    is_fixed: true,
    fixed_amount: (name === 'late' ? data.late_fine_amount : data.not_attending_fine_amount) || 0,
    is_based_on_time: false,
    type: 'Meeting',
    period_type: null,
    amount_per_period: null,
    loan_type: name,
    meeting_type: name,
    count_as_profit: false,
    additional_config: {},
  };
}
