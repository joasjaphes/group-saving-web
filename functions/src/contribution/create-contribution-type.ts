import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { groupId, contributionKey, name, valuePerShare, amount, minimumAmount, frequency, isMandatory, isAmountTheSame,  isLoanAllowed, isFineAllowed, fineAmount, fineCalculationType, fineName}
 */
export const createContributionType = functions.https.onRequest((request, response) => {
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
      response.status(400).send({data: 'Invalid token please send a valid token'});
      return;
    }
    try {
      const groupId = data.groupId;
      const last_update = new Date().getTime();
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      const groupDocRef = admin.firestore().doc(`groups/${groupId}`);
      const finesRef = admin.firestore().collection(`groups/${groupId}/fine_type`);
      const contributionTypeId = data.id ? data.id : helpers.makeid();
      const contributionTypeDocRef = admin.firestore().doc(`groups/${groupId}/contribution_type/${contributionTypeId}`);
      await admin.firestore().runTransaction(async transaction => {
        const groupDoc = await transaction.get(groupDocRef);
        const fine_types = await transaction.get(finesRef);
        if (!groupDoc.exists) {
          response.status(500).send({data: 'Fail'});
        }
        const groupData = {...groupDoc.data()};
        // Here I am preparing and dealing with fine types
        if (data.isFineAllowed === 'Yes') {
          const fineTypes = fine_types.docs.map(i => i.data());
          const fineToUse = fineTypes.find(i => i.type === 'Contribution' && i.contribution_type_id === contributionTypeId);
          const fineId = fineToUse ? fineToUse.id : helpers.makeid();
          const fineDocRef = admin.firestore().doc(`groups/${groupId}/fine_type/${fineId}`);
          transaction.set(fineDocRef, prepareFineData(fineId, data, fineToUse, last_update, contributionTypeId), {merge: true});
        }

        // Start of saving data
        transaction.update(groupDocRef, {...getGroupUpdateData(data, groupData, last_update)});
        transaction.set(contributionTypeDocRef, prepareContributionData(data, contributionTypeId, last_update), {merge: true});
        if (data.isFineAllowed === 'Yes') {
          transaction.update(otherUpdateAtRef, {
            group_updated: last_update,
            contribution_type_updated: last_update,
            fine_type_update: last_update,
          });
        } else {
          transaction.update(otherUpdateAtRef, {
            group_updated: last_update,
            contribution_type_updated: last_update,
          });
        }
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});

function prepareFineData(fineId: string, data: any, fineData: any, last_update: any, contribution_type_id: any) {
  return {
    id: fineId,
    group_id: data.groupId,
    is_active: true,
    last_update,
    contribution_type_id,
    description: data.fineName || null,
    calculation: data.fineCalculationType,
    is_based_on_balance: false,
    is_based_on_amount_to_be_paid: false,
    balance_percentage: null,
    amount_to_be_paid_percentage: null,
    is_fixed: data.fineCalculationType === 'Fixed',
    fixed_amount: data.fineAmount,
    is_based_on_time: data.fineCalculationType !== 'Fixed',
    type: 'Contribution',
    period_type: data.fineCalculationType,
    amount_per_period: data.fineAmount,
    loan_type: null,
    count_as_profit: false,
    additional_config: {},
  };
}

function getGroupUpdateData(data: any, groupData: any, last_update: any) {
  const shareReady = (groupData.has_share && groupData.share_set) || (!groupData.has_share);
  const socialReady = (groupData.has_social && groupData.social_set) || (!groupData.has_social);
  const entryReady = (groupData.has_entry_fee && groupData.entry_fee_set) || (!groupData.has_entry_fee);
  const otherReady = (groupData.has_other_contribution && groupData.other_contribution_set) || (!groupData.has_other_contribution);
  if (data.contibutionKey === 'Share') {
    return {
      installation_step: socialReady && entryReady && otherReady ? 'SIXTH' : 'FIRTH',
      share_set: true,
      last_update,
    };
  } else if (data.contibutionKey === 'Social') {
    return {
      installation_step: shareReady && entryReady && otherReady ? 'SIXTH' : 'FIRTH',
      social_set: true,
      last_update,
    };
  } else if (data.contibutionKey === 'Other') {
    return {
      installation_step: socialReady && shareReady && entryReady ? 'SIXTH' : 'FIRTH',
      other_contribution_set: true,
      last_update,
    };
  } else if (data.contibutionKey === 'Entry Fee') {
    return {
      installation_step: socialReady && shareReady && otherReady ? 'SIXTH' : 'FIRTH',
      entry_fee_set: true,
      last_update,
    };
  } else {
    return {
      last_update,
    };
  }

}

function prepareContributionData(data: any, contributionTypeId: string, last_update: any) {
  return {
    id: contributionTypeId,
    group_id: data.groupId,
    is_active: true,
    last_update,
    allow_loan: data.isLoanAllowed === 'Yes',
    allow_late_fine: data.isFineAllowed === 'Yes',
    collection_frequency: data.frequency,
    description: data.name,
    type: data.contributionKey,
    is_hisa: data.contributionKey === 'Share',
    hisa_value: data.contributionKey === 'Share' ? data.valuePerShare : 0,
    new_hisa_value: data.contributionKey === 'Share' ? data.valuePerShare : 0,
    hisa_value_type: null,
    hisa_distribution_strategy: null,
    loan_is_set: false,
    fine_is_set: true,
    is_fixed: data.isAmountTheSame === 'Yes',
    fixed_value: data.amount,
    is_one_time_contribution: data.isOneTime,
    minimum_contribution: data.minimumAmount ?? 0,
    is_must: data.isMandatory === 'Yes',
    last_month_of_contribution: null,
    name: data.name,
    members_can_see_others: false,
    day_of_contribution: null,
    is_fine_allowed: data.isFineAllowed,
    fine_period_type: data.fineCalculationType || null,
    fine_calculation: data.fineCalculationType || null,
    fine_amount_per_period: data.fineAmount || 0,
    managed_by: null,
    track_balance: data.trackBalance === 'Yes',
    additional_config: {},
  };
}
