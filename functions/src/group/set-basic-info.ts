import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { groupId,  frequency, currency, has_entry_fee, has_social, has_other_contribution, has_share, entry_fee_amount }
 */
export const setBasicInfo = functions.https.onRequest((request, response) => {
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
    const tokenId = request.get('Authorization')?.split('Bearer ')[1];
    if (tokenId !== helpers.token) {
      response.status(400).send('Invalid token please send a valid token');
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
        const meeting_settings = groupData.meeting_settings
          ? {...groupData.meeting_settings, meeting_frequency: data.frequency}
          : {meeting_frequency: data.frequency};
        transaction.update(groupDocRef, {
          ...groupData,
          last_update,
          meeting_settings,
          currency: data.currency,
          contribution_frequency: data.frequency,
          currency_name: data.currency_name,
          has_share: data.has_share ?? false,
          has_social: data.has_social ?? false,
          has_entry_fee: data.has_entry_fee ?? false,
          has_other_contribution: data.has_other_contribution ?? false,
          share_set: false,
          social_set: false,
          entry_fee_set: false,
          other_contribution_set: false,
          track_contribution_period: data.track_contribution_period === 'Yes',
        });
        if (data.has_entry_fee) {
          const contributionTypeId = helpers.makeid();
          const contributionTypeDocRef = admin.firestore().doc(`groups/${groupId}/contribution_type/${contributionTypeId}`);
          transaction.set(contributionTypeDocRef, prepareEntryFee(data, contributionTypeId, last_update), {merge: true});
          transaction.set(otherUpdateAtRef, {group_updated: last_update, contribution_type_updated: last_update}, {merge: true});
        } else {
          transaction.set(otherUpdateAtRef, {group_updated: last_update}, {merge: true});
        }
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});

function prepareEntryFee(data: any, contributionTypeId: string, last_update: any) {
  return {
    id: contributionTypeId,
    group_id: data.groupId,
    is_active: true,
    last_update,
    allow_loan: false,
    allow_late_fine: false,
    collection_frequency: 'Once',
    description: 'Entry Fee',
    type: 'Entry Fee',
    is_hisa: false,
    hisa_value: 0,
    new_hisa_value: 0,
    hisa_value_type: null,
    hisa_distribution_strategy: null,
    loan_is_set: false,
    fine_is_set: false,
    is_fixed: true,
    fixed_value: data.entry_fee_amount,
    is_one_time_contribution: true,
    minimum_contribution: 0,
    is_must: true,
    last_month_of_contribution: null,
    name: 'Entry Fee',
    members_can_see_others: true,
    day_of_contribution: null,
    managed_by: null,
    additional_config: {},
  };
}
