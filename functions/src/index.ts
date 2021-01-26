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
import * as setGroupLeadership from './group/set-group-leadership';
import * as setMeetingFrequency from './group/set-meeting-frequency';
import * as setAvailableContributionType from './contribution/set-available-contribution-type';
import * as addNewContribution from './contribution/add_new_contribution';
import * as setContributionBalances from './contribution/group-starting-balances';
import * as createContributionType from './contribution/create-contribution-type';
import * as createExpense from './contribution/add-expense';
import * as createLoanType from './loan/create-loan-type';
import * as assignLoanToMember from './loan/assign_loan';
import * as setMeetingDetails from './meeting/set-meeting-details';

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
exports.setGroupLeadership = setGroupLeadership.setGroupLeadership;
exports.setMeetingDetails = setMeetingDetails.setMeetingDetails;
exports.assignLoanToMember = assignLoanToMember.assignLoanToMember;
exports.addNewContribution = addNewContribution.addNewContribution;
exports.setContributionBalances = setContributionBalances.setContributionBalances;
exports.createExpense = createExpense.createExpense;
