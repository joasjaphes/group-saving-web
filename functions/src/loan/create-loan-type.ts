import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});

/**
 * input data : { groupId, contribution_type_id, duration_type, name: this.name,
 * profit_type, interest_rate, loan_formular, pay_same_amount_is_must, is_insured,
 * insurance_percent, min_duration,  max_duration,  minimum_amount, max_amount_type, max_amount_balance_base, maximum_amount,
 * allow_loan_top_up, is_fine_for_returns,  fine_for_returns_calculation_type, fine_for_returns_amount,
 * fine_for_returns_balance_factor, is_fine_for_completion, fine_for_completion_calculation_type,
 * fine_for_completion_amount,  fine_for_completion_balance_factor, payment_option
 */
export const createLoanType = functions.https.onRequest((request, response) => {
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
      const finesRef = admin.firestore().collection(`groups/${groupId}/fine_type`);
      const loanTypeId = data.id ? data.id : helpers.makeid();
      const loanTypeDocRef = admin.firestore().doc(`groups/${groupId}/loan_type/${loanTypeId}`);
      await admin.firestore().runTransaction(async transaction => {
        const fine_types = await transaction.get(finesRef);
        // Here I am preparing and dealing with fine types
        if (data.is_fine_for_returns === 'Yes') {
          const fineTypes = fine_types.docs.map(i => i.data());
          const fineToUse = fineTypes.find(i => i.type === 'Loan' && i.loan_type_id === loanTypeId);
          const fineId = fineToUse ? fineToUse.id : helpers.makeid();
          const fineDocRef = admin.firestore().doc(`groups/${groupId}/fine_type/${fineId}`);
          transaction.set(fineDocRef, prepareFineData(fineId, data, fineToUse, last_update, loanTypeId, 'Fine for late returns of'), {merge: true});
        }
        if (data.is_fine_for_completion === 'Yes') {
          const fineTypes = fine_types.docs.map(i => i.data());
          const fineToUse = fineTypes.find(i => i.type === 'Loan' && i.loan_type_id === loanTypeId);
          const fineId = fineToUse ? fineToUse.id : helpers.makeid();
          const fineDocRef = admin.firestore().doc(`groups/${groupId}/fine_type/${fineId}`);
          transaction.set(fineDocRef, prepareFineData(fineId, data, fineToUse, last_update, loanTypeId, 'Fine for late completion of '), {merge: true});
        }

        transaction.set(loanTypeDocRef, prepareContributionData(data, loanTypeId, last_update), {merge: true});
        if (data.is_fine_for_returns === 'Yes' || data.is_fine_for_completion === 'Yes') {
          transaction.update(otherUpdateAtRef, {
            loan_type_updated: last_update,
            fine_type_update: last_update,
          });
        } else {
          transaction.update(otherUpdateAtRef, {
            loan_type_updated: last_update,
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

function prepareFineData(fineId: string, data: any, fineData: any, last_update: any, loan_type_id: any, name: string) {
  return {
    id: fineId,
    group_id: data.groupId,
    is_active: true,
    last_update,
    contribution_type_id: data.contribution_type_id,
    loan_type_id,
    description: `${name} ${data.name}`,
    calculation: (name === 'Fine for late returns of' ? data.fine_for_returns_calculation_type : data.fine_for_completion_calculation_type) || null,
    is_based_on_balance: false,
    is_based_on_amount_to_be_paid: false,
    balance_percentage: (name === 'Fine for late returns of' ? data.fine_for_returns_balance_factor : data.fine_for_completion_balance_factor) || null,
    amount_to_be_paid_percentage: null,
    is_fixed: name === 'Fine for late returns of' ? data.fine_for_returns_calculation_type === 'Fixed' : data.fine_for_completion_calculation_type === 'Fixed',
    fixed_amount: (name === 'Fine for late returns of' ? data.fine_for_returns_amount : data.fine_for_completion_amount) || 0,
    is_based_on_time: false,
    type: 'Loan',
    period_type: null,
    amount_per_period: null,
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
    contribution_type_id: data.contribution_type_id,
    duration_type: data.duration_type || null,
    name: data.name,
    profit_type: data.profit_type || null,
    interest_rate: data.interest_rate || 0,
    loan_formular: data.loan_formular || null,
    pay_same_amount_is_must: data.pay_same_amount_is_must === 'Yes',
    is_insured: data.is_insured === 'Yes',
    insurance_percent: data.insurance_percent || 0,
    min_duration: data.min_duration || 0,
    max_duration: data.max_duration || 0,
    minimum_amount: data.minimum_amount || 0,
    max_amount_type: data.max_amount_type || null,
    max_amount_balance_base: data.max_amount_balance_base || 0,
    maximum_amount: data.maximum_amount || 0,
    payment_option: data.payment_option || null,
    allow_loan_top_up: data.allow_loan_top_up === 'Yes',
    is_fine_for_returns: data.is_fine_for_returns === 'Yes',
    fine_for_returns_calculation_type: data.fine_for_returns_calculation_type || null,
    fine_for_returns_amount: data.fine_for_returns_amount || 0,
    fine_for_returns_balance_factor: data.fine_for_returns_balance_factor || 0,
    is_fine_for_completion: data.is_fine_for_completion === 'Yes',
    fine_for_completion_calculation_type: data.fine_for_completion_calculation_type || null,
    fine_for_completion_amount: data.fine_for_completion_amount || 0,
    fine_for_completion_balance_factor: data.fine_for_completion_balance_factor || 0,
    additional_config: {},
  };
}
