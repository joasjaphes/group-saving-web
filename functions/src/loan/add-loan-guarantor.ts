import * as functions from 'firebase-functions';
import * as helpers from '../helpers';
import * as admin from 'firebase-admin';
import {LoanModel} from '../data-models/loan.model';

const cors = require('cors')({origin: true});

// input data : { groupId, memberId, loanId, remainingBalance, firstMemberId, secondMemberId, thirdMemberId}
export const addLoanGuarantors = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (request.method !== 'POST') {
      if (request.method !== 'OPTIONS') {
        response.status(400).send({data: 'Please send a POST request'});
        return;
      }
    }
    const data = request.body as {groupId: string, memberId: string, remainingBalance: any , firstMemberId: string, secondMemberId: string, thirdMemberId: string, loanId: string, loanDetails: any};
    const tokenId = request.get('Authorization')?.split('Bearer ')[1];
    if (tokenId !== helpers.token) {
      response.status(400).send({data: 'Invalid token please send a valid token'});
      return;
    }
    try {
      const groupId = data.groupId;
      const last_update = new Date().getTime();
      const memberRef = admin.firestore().doc(`groups/${data.groupId}/members/${data.memberId}`);
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      await admin.firestore().runTransaction(async transaction => {
        const memberDoc = await transaction.get(memberRef);
        const memberData: any = {...memberDoc.data()};
        if (parseInt(data.remainingBalance + '', 10) === 0) {
          const loanRef = admin.firestore().doc(`groups/${data.groupId}/loans/member_${data.memberId}`);
          const loanDoc = await transaction.get(loanRef);
          if (loanDoc.exists) {
            const existingLoanData = loanDoc.data() as LoanModel;
            const loanDetails = existingLoanData.loans[data.loanId];
            const updated = {
              ...existingLoanData,
              loans: {
                ...existingLoanData.loans,
                [data.loanId]: {
                  ...loanDetails,
                  additional_config: {
                    ...loanDetails.additional_config,
                    firstMemberId: data.firstMemberId ?? '',
                    secondMemberId: data.secondMemberId ?? '',
                    thirdMemberId: data.thirdMemberId ?? '',
                  },
                },
              },
            }
            transaction.set(loanRef, {...updated, last_update}, {merge: true});
            transaction.set(otherUpdateAtRef, {loan_updated: last_update}, {merge: true});
          }
        } else {
          if (memberData.active_loans && memberData.active_loans[data.loanId]) {
            const loanDetails = memberData.active_loans[data.loanId];
            const updated = {
              ...memberData,
              active_loans: {
                ...memberData.active_loans,
                [data.loanId]: {
                  ...loanDetails,
                  additional_config: {
                    ...loanDetails.additional_config,
                    firstMemberId: data.firstMemberId ?? '',
                    secondMemberId: data.secondMemberId ?? '',
                    thirdMemberId: data.thirdMemberId ?? '',
                  },
                },
              },
            }
            transaction.update(memberRef, {...updated, last_update});
            transaction.set(otherUpdateAtRef, {member_updated: last_update}, {merge: true});
          }
        }

      });
      response.status(200).send({data: 'Success'});
    } catch (e) {
      console.log('Error assigning loan to member:', e);
      response.status(500).send({data: 'Fail'});
    }

  });

});

