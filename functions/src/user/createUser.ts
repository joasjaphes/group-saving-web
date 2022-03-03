import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as helpers from '../helpers';
import UserRecord = admin.auth.UserRecord;

const cors = require('cors')({origin: true});

/**
 * input data : {email, phoneNumber, password, name,memberName,groupName,numberOfMembers,countryCode  }
 */
export const createUser = functions.https.onRequest((request, response) => {
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
    console.log(data);
    console.log(request.get('Authorization'));
    const tokenId = request.get('Authorization')?.split('Bearer ')[1];
    if (tokenId !== helpers.token) {
      response.status(400).send('Invalid token please send a valid token');
      return;
    }
    try {
      const userData: UserRecord = await admin.auth().createUser({
        email: data?.email,
        emailVerified: true,
        phoneNumber: data?.phoneNumber,
        password: data?.password,
        displayName: data?.name,
        disabled: false,
      });
      const groupId = helpers.makeid();
      const memberId = helpers.makeid();
      admin.firestore().collection('member_group');
      const groupMemberDocRef = admin.firestore().collection('member_group');
      const memberDocRef = admin.firestore().doc(`groups/${groupId}/members/${memberId}`);
      const otherUpdateAtRef = admin.firestore().doc(`groups/${groupId}/updated/others`);
      const groupDocRef = admin.firestore().doc(`groups/${groupId}`);
      const last_update = new Date().getTime();
      await createGroup(data, groupDocRef, groupId, last_update, memberId);
      await createMember(data, memberDocRef, groupId, memberId, last_update);
      await updateLastUpdated(otherUpdateAtRef, last_update);
      await groupMemberDocRef.add({
        id: helpers.makeid(),
        member_id: memberId,
        group_id: groupId,
        group_name: data?.groupName,
        member_name: data?.name,
        user_id: userData.uid,
        phone_number: data?.phoneNumber,
        activation_status: 'active',
        alternative_phone_number: '',
        last_update,
      });
      response.status(200).send(userData.toJSON());
    } catch (e) {
      console.log('Error fetching user data:', e);
      response.status(500).send('Fail');
    }

  });

});

function updateLastUpdated(otherUpdateAtRef: any, last_update: number) {
  return admin.firestore().runTransaction((transaction) => {
    return transaction.get(otherUpdateAtRef).then((groupDoc) => {
      transaction.set(otherUpdateAtRef, {
        member_group: last_update,
        group_updated: last_update,
        member_updated: last_update,
      }, {merge: true});
    });
  });
}

function createMember(data: any, memberDocRef: FirebaseFirestore.DocumentReference, groupId: string, memberId: string, last_update: number) {
  return memberDocRef.create({
    id: memberId,
    group_id: groupId,
    is_active: true,
    last_update,
    name: data?.memberName,
    email: data?.email,
    phone_number: data?.phoneNumber,
    alternative_phone_number: data?.phoneNumber,
    gender: '',
    date_joined: '',
    can_edit: true,
    permissions: {},
    additional_config: {},
  });
}

function createGroup(data: any, groupDocRef: FirebaseFirestore.DocumentReference, groupId: string, last_update: number, memberId: string) {
  return groupDocRef.create({
    id: groupId,
    allow_multiple_loan: null,
    bank_account_number: null,
    logo: null,
    use_bank: null,
    bank_branch: null,
    bank_name: null,
    chairperson: null,
    secretary: null,
    treasure: null,
    group_name: data?.groupName,
    usage_start_date: null,
    last_update,
    installation_step: 'FIRST',
    number_of_contributions: null,
    number_of_members: data?.numberOfMembers,
    number_of_loan_types: null,
    members_can_see_all: true,
    additional_config: {},
    meeting_settings: {},
    next_meeting: {},
    fines: {},
    contributions: {},
    loanTypes: {},
    loan_queue: [],
    share_periods: [],
    contribution_balances: {},
    country: data?.countryCode,
    currency: data?.currency,
    currency_name: data?.currencyName,
    has_investment: null,
    has_buying_seling_investment: null,
    has_long_term_investment: null,
    has_share: false,
    has_entry_fee: false,
    has_social: false,
    has_other_contribution: false,
    payment_reference: helpers.makeid(),
    start_year: null,
    start_month: null,
    created_by: memberId,
  });
}
