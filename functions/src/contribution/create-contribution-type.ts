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
      const contributionTypeId = data.id ? data.id : helpers.makeid();
      // const contributionTypeDocRef = admin.firestore().doc(`groups/${groupId}/contribution_type/${contributionTypeId}`);
      await admin.firestore().runTransaction(async transaction => {
        const groupDoc = await transaction.get(groupDocRef);
        if (!groupDoc.exists) {
          response.status(500).send({data: 'Fail'});
        }
        const groupData = {...groupDoc.data()};
        const fine_types = groupData.fines ? Object.keys(groupData.fines).map(i => groupData.fines[i]) : [];
        // Here I am preparing and dealing with fine types
        if (data.isFineAllowed === 'Yes') {
          const fineToUse = fine_types.find(i => i.type === 'Contribution' && i.contribution_type_id === contributionTypeId);
          const fineId = fineToUse ? fineToUse.id : helpers.makeid();
          // const fineDocRef = admin.firestore().doc(`groups/${groupId}/fine_type/${fineId}`);
          const fine = prepareFineData(fineId, data, fineToUse, last_update, contributionTypeId);
          if (groupData.fines) {
            groupData.fines[fineId] = fine;
          } else {
            groupData.fines = {[fineId]: fine};
          }
          // transaction.set(fineDocRef, prepareFineData(fineId, data, fineToUse, last_update, contributionTypeId), {merge: true});
        } else {
          const fineToUse = fine_types.find(i => i.type === 'Contribution' && i.contribution_type_id === contributionTypeId);
          const fineId = fineToUse ? fineToUse.id : null;
          if (!!fineToUse) {
            if (data.fineHasData) {
              groupData.fines[fineId] = {
                ...groupData.fines[fineId],
                is_active: false,
              };
            } else {
              groupData.fines = Object.keys(groupData.fines).reduce((object: any, key: string) => {
                if (key !== fineId) {
                  object[key] = groupData.fines[key];
                }
                return object;
              }, {});
            }
          }
        }
        const contr = prepareContributionData(data, contributionTypeId, last_update);
        if (groupData.contributions) {
          groupData.contributions[contributionTypeId] = contr;
        } else {
          groupData.contributions = {[contributionTypeId]: contr};
        }
        // Start of saving data
        transaction.update(groupDocRef, {...groupData, last_update});
        transaction.set(otherUpdateAtRef, { group_updated: last_update }, {merge: true});
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
    fixed_value: data.amount || 0,
    is_one_time_contribution: data.isOneTime || false,
    minimum_contribution: data.minimumAmount ?? 0,
    is_must: data.isMandatory === 'Yes',
    last_month_of_contribution: null,
    name: data.name || '',
    members_can_see_others: false,
    day_of_contribution: null,
    is_fine_allowed: data.isFineAllowed || false,
    fine_period_type: data.fineCalculationType || null,
    fine_calculation: data.fineCalculationType || null,
    fine_amount_per_period: data.fineAmount || 0,
    managed_by: null,
    track_balance: data.trackBalance === 'Yes',
    is_starting_share: data.isStartingShare === 'Yes',
    minimum_starting_share: data.minimumStartingShare ?? 0,
    contribution_has_deadline: data.contributionHasDeadline === 'Yes',
    contribution_start_date: data.contributionStartDate || '',
    contribution_end_date: data.contributionEndDate || '',
    is_given_to_member: data.isGivenToMember === 'Yes',
    member_id: data.memberId || '',
    additional_config: {},
  };
}
