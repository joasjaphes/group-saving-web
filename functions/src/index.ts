import * as admin from 'firebase-admin';

admin.initializeApp();

import * as getUserByPhoneNumber from './user/get-user-by-phone';
import * as getUserGroupsByPhoneNumber from './user/get-member-groups-by-phone';
import * as createUser from './user/createUser';
import * as createUserOnly from './user/createUserOnly';
import * as createMembers from './members/create-members';
import * as updateNeedToAddMember from './group/update-need-to-add-members';
import * as confirmCurrency from './group/confirm-currency';
import * as setBasicInfo from './group/set-basic-info';
import * as setMeetingFrequency from './group/set-meeting-frequency';
import * as setAvailableContributionType from './contribution/set-available-contribution-type';
import * as createContributionType from './contribution/create-contribution-type';
import * as createLoanType from './loan/create-loan-type';

exports.getUserByPhoneNumber = getUserByPhoneNumber.getUserByPhoneNumber;

exports.getUserGroupsByPhoneNumber = getUserGroupsByPhoneNumber.getUserGroupsByPhoneNumber;

exports.createUser = createUser.createUser;

exports.createUserOnly = createUserOnly.createUserOnly;
exports.createMembers = createMembers.createMembers;
exports.setMeetingFrequency = setMeetingFrequency.setMeetingFrequency;
exports.setAvailableContributionType = setAvailableContributionType.setAvailableContributionType;
exports.updateNeedToAddMember = updateNeedToAddMember.updateNeedToAddMember;
exports.confirmCurrency = confirmCurrency.confirmCurrency;
exports.createContributionType = createContributionType.createContributionType;
exports.createLoanType = createLoanType.createLoanType;
exports.setBasicInfo = setBasicInfo.setBasicInfo;
