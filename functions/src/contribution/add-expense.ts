import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';
import {ExpenseModel, SingleExpenseModel} from '../data-models/expense.model';

const cors = require('cors')({origin: true});

/**
 * input data : { groupId, chairperson,  secretary, treasure }
 */
export const createExpense = functions.https.onRequest((request, response) => {
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
        const contributionTypes = groupData.contributions || {};
        const contrType = contributionTypes[data.associated_account];
        const amount = data.amount + '';
        // taking out the amount from the balance
        if (contrType && contrType.track_balance) {
          if (!!amount && data.associated_account && groupData.contribution_balances && groupData.contribution_balances[data.associated_account]) {
            groupData.contribution_balances[data.associated_account] = parseFloat(groupData.contribution_balances[data.associated_account] + '') - parseFloat(amount);
          }
        }
        const expense: any = prepareExpenseDetails(data, last_update);
        const expenseRef = admin.firestore().doc(`groups/${data.groupId}/expense/${data.groupId}_${expense.year}`);
        const expenseDoc = await transaction.get(expenseRef);
        const existingExpense: ExpenseModel = expenseDoc.exists ? expenseDoc.data() as ExpenseModel : {
          id: `${data.groupId}_${expense.year}`,
          group_id: data.groupId,
          year: expense.year,
          expenses: {},
        };
        existingExpense.expenses[expense.id] = expense;
        if (contrType && contrType.track_balance) {
          transaction.update(groupDocRef, { ...groupData , last_update});
          transaction.set(otherUpdateAtRef, {
            group_updated: last_update,
          }, {merge: true});
        }
        transaction.set(expenseRef, {...existingExpense, last_update});
        transaction.set(otherUpdateAtRef, {
          expense_updated: last_update,
        }, {merge: true});
      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send({data: 'Fail'});
    }
  });

});

function prepareExpenseDetails(data: any, last_update: any): SingleExpenseModel {
  return {
    id: data.id,
    group_id: data.groupId,
    amount: data.amount,
    associated_account: data.associated_account,
    date: helpers.formatDate(data.date),
    month: helpers.getMonth(data.date),
    reason: data.reason,
    last_update,
    is_active: true,
    associated_member_id: data.memberId ? data.memberId : null,
    additional_config: {},
    year: helpers.getYear(data.date) + '',
  };
}
