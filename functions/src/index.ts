import * as admin from 'firebase-admin';

admin.initializeApp();

import * as getUserByPhoneNumber from './user/get-user-by-phone';
import * as getUserGroupsByPhoneNumber from './user/get-member-groups-by-phone';
import * as createUser from './user/createUser';
import * as createUserOnly from './user/createUserOnly';
import * as createMembers from './members/create-members';
import * as createSingleMember from './members/create-single-member';
import * as updateNeedToAddMember from './group/update-need-to-add-members';
import * as confirmCurrency from './group/confirm-currency';
import * as setBasicInfo from './group/set-basic-info';
import * as updateBasicInfo from './group/update-basic-info';
import * as setShareTimeline from './group/set-share-timeline';
import * as setGroupLeadership from './group/set-group-leadership';
import * as setMeetingFrequency from './group/set-meeting-frequency';
import * as setAvailableContributionType from './contribution/set-available-contribution-type';
import * as addNewContribution from './contribution/add_new_contribution';
import * as addPastContributions from './contribution/add_past_contribution_by_month';
import * as setContributionBalances from './contribution/group-starting-balances';
import * as createContributionType from './contribution/create-contribution-type';
import * as createExpense from './contribution/add-expense';
import * as createLoanType from './loan/create-loan-type';
import * as assignLoanToMember from './loan/assign_loan';
import * as createLoanQueue from './loan/add-loan-queue';
import * as assignPastActiveLoanToMember from './loan/add_previous_loan';
import * as setMeetingDetails from './meeting/set-meeting-details';
import * as setNextMeeting from './meeting/set-next-meeting-details';
import * as completeMeeting from './meeting/complete-meeting-details';
import * as updateMeeting from './meeting/update-meeting-details';
import * as deleteMeeting from './meeting/remove-meeting-details';
import * as cancelNextMeeting from './meeting/cancel-next-meeting-details';

exports.getUserByPhoneNumber = getUserByPhoneNumber.getUserByPhoneNumber;

exports.getUserGroupsByPhoneNumber = getUserGroupsByPhoneNumber.getUserGroupsByPhoneNumber;

exports.createUser = createUser.createUser;

exports.createUserOnly = createUserOnly.createUserOnly;
exports.createMembers = createMembers.createMembers;
exports.createSingleMember = createSingleMember.createSingleMember;
exports.setMeetingFrequency = setMeetingFrequency.setMeetingFrequency;
exports.setAvailableContributionType = setAvailableContributionType.setAvailableContributionType;
exports.updateNeedToAddMember = updateNeedToAddMember.updateNeedToAddMember;
exports.confirmCurrency = confirmCurrency.confirmCurrency;
exports.createContributionType = createContributionType.createContributionType;
exports.createLoanType = createLoanType.createLoanType;
exports.setBasicInfo = setBasicInfo.setBasicInfo;
exports.setShareTimeline = setShareTimeline.setShareTimeline;
exports.updateBasicInfo = updateBasicInfo.updateBasicInfo;
exports.setGroupLeadership = setGroupLeadership.setGroupLeadership;
exports.setMeetingDetails = setMeetingDetails.setMeetingDetails;
exports.setNextMeeting = setNextMeeting.setNextMeeting;
exports.cancelNextMeeting = cancelNextMeeting.cancelNextMeeting;
exports.completeMeeting = completeMeeting.completeMeeting;
exports.updateMeeting = updateMeeting.updateMeeting;
exports.deleteMeeting = deleteMeeting.deleteMeeting;
exports.assignLoanToMember = assignLoanToMember.assignLoanToMember;
exports.createLoanQueue = createLoanQueue.createLoanQueue;
exports.addNewContribution = addNewContribution.addNewContribution;
exports.setContributionBalances = setContributionBalances.setContributionBalances;
exports.createExpense = createExpense.createExpense;
exports.addPastContributions = addPastContributions.addPastContributions;
exports.assignPastActiveLoanToMember = assignPastActiveLoanToMember.assignPastActiveLoanToMember;
