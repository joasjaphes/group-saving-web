import * as admin from 'firebase-admin';

admin.initializeApp();

import * as getUserByPhoneNumber from './user/get-user-by-phone';
import * as getUserGroupsByPhoneNumber from './user/get-member-groups-by-phone';
import * as createUser from './user/createUser';
import * as createUserOnly from './user/createUserOnly';
import * as createNewGroup from './user/createNewGroup';
import * as createMembers from './members/create-members';
import * as createSingleMember from './members/create-single-member';
import * as updateSingleMember from './members/update-single-member';
import * as updatePhoneNumber from './members/update-phone-number';
import * as addAnotherAccount from './members/add-another-account';
import * as updateNeedToAddMember from './group/update-need-to-add-members';
import * as confirmCurrency from './group/confirm-currency';
import * as setBasicInfo from './group/set-basic-info';
import * as updateBasicInfo from './group/update-basic-info';
import * as setShareTimeline from './group/set-share-timeline';
import * as setGroupLeadership from './group/set-group-leadership';
import * as groupPermission from './group/set-group-permission';
import * as setMeetingFrequency from './group/set-meeting-frequency';
import * as setAvailableContributionType from './contribution/set-available-contribution-type';
import * as addNewContribution from './contribution/add_new_contribution';
import * as deleteContribution from './contribution/delete_contribution';
import * as addPastContributions from './contribution/add_past_contribution_by_month';
import * as addOneTimeContribution from './contribution/add_one_time_contribution';
import * as setContributionBalances from './contribution/group-starting-balances';
import * as createContributionType from './contribution/create-contribution-type';
import * as createExpense from './contribution/add-expense';
import * as updateExpense from './contribution/update-expense';
import * as deleteExpense from './contribution/delete-expense';
import * as createLoanType from './loan/create-loan-type';
import * as assignLoanToMember from './loan/assign_loan';
import * as addLoanGuarantors from './loan/add-loan-guarantor';
import * as createLoanQueue from './loan/add-loan-queue';
import * as removeMemberFromLoanQueue from './loan/remove-loan-queue';
import * as assignPastActiveLoanToMember from './loan/add_previous_loan';
import * as setMeetingDetails from './meeting/set-meeting-details';
import * as setNextMeeting from './meeting/set-next-meeting-details';
import * as completeMeeting from './meeting/complete-meeting-details';
import * as updateMeeting from './meeting/update-meeting-details';
import * as deleteMeeting from './meeting/remove-meeting-details';
import * as deleteLoan from './loan/delete_loan';
import * as cancelNextMeeting from './meeting/cancel-next-meeting-details';
import * as addExpectedFines from './contribution/add_expected_fines';
import * as addLoanRequest from './loan/add_loan_request';
import * as deleteExpectedFine from './contribution/delete-expected-fine';
import * as deleteOneTimeContribution from './contribution/delete-one-time-contribution';
import * as importLoanFromExcel from './loan/import_previous_loan';
import * as updateMemberProfilePicture from './members/update-profile_picture';
import * as setGroupProfilePicture from './group/set-group-profile-photo';
import * as setNextMeetingExcuse from './meeting/set-next-meeting-excuse';
import * as removeNextMeetingExcuse from './meeting/remove-next-meeting-excuse';
import * as addNewContributionForApproval from './contribution/add_new_contribution_for_approval';
import * as cancelNewContributionForApproval from './contribution/cancel_new_contribution_for_approval';
import * as updatePassword from './members/update-password';
import * as addPastExpenseByMonth from './contribution/add_past_expense_by_month';

exports.getUserByPhoneNumber = getUserByPhoneNumber.getUserByPhoneNumber;

exports.getUserGroupsByPhoneNumber =
  getUserGroupsByPhoneNumber.getUserGroupsByPhoneNumber;

exports.createUser = createUser.createUser;

exports.createUserOnly = createUserOnly.createUserOnly;
exports.createMembers = createMembers.createMembers;
exports.createSingleMember = createSingleMember.createSingleMember;
exports.updateSingleMember = updateSingleMember.updateSingleMember;
exports.addAnotherAccount = addAnotherAccount.addAnotherAccount;
exports.updatePhoneNumber = updatePhoneNumber.updatePhoneNumber;
exports.setMeetingFrequency = setMeetingFrequency.setMeetingFrequency;
exports.setAvailableContributionType =
  setAvailableContributionType.setAvailableContributionType;
exports.updateNeedToAddMember = updateNeedToAddMember.updateNeedToAddMember;
exports.confirmCurrency = confirmCurrency.confirmCurrency;
exports.createContributionType = createContributionType.createContributionType;
exports.createLoanType = createLoanType.createLoanType;
exports.setBasicInfo = setBasicInfo.setBasicInfo;
exports.setShareTimeline = setShareTimeline.setShareTimeline;
exports.updateBasicInfo = updateBasicInfo.updateBasicInfo;
exports.setGroupLeadership = setGroupLeadership.setGroupLeadership;
exports.setGroupPermission = groupPermission.setGroupPermission;
exports.setMeetingDetails = setMeetingDetails.setMeetingDetails;
exports.setNextMeeting = setNextMeeting.setNextMeeting;
exports.cancelNextMeeting = cancelNextMeeting.cancelNextMeeting;
exports.completeMeeting = completeMeeting.completeMeeting;
exports.updateMeeting = updateMeeting.updateMeeting;
exports.deleteMeeting = deleteMeeting.deleteMeeting;
exports.deleteLoan = deleteLoan.deleteLoan;
exports.addLoanGuarantors = addLoanGuarantors.addLoanGuarantors;
exports.assignLoanToMember = assignLoanToMember.assignLoanToMember;
exports.createLoanQueue = createLoanQueue.createLoanQueue;
exports.removeMemberFromLoanQueue =
  removeMemberFromLoanQueue.removeMemberFromLoanQueue;
exports.addNewContribution = addNewContribution.addNewContribution;
exports.setContributionBalances =
  setContributionBalances.setContributionBalances;
exports.createExpense = createExpense.createExpense;
exports.updateExpense = updateExpense.updateExpense;
exports.deleteExpense = deleteExpense.deleteExpense;
exports.addPastContributions = addPastContributions.addPastContributions;
exports.addOneTimeContribution = addOneTimeContribution.addOneTimeContribution;
exports.deleteContribution = deleteContribution.deleteContribution;
exports.assignPastActiveLoanToMember =
  assignPastActiveLoanToMember.assignPastActiveLoanToMember;
exports.addExpectedFines = addExpectedFines.addExpectedFines;
exports.addLoanRequest = addLoanRequest.addLoanRequest;
exports.deleteExpectedFine = deleteExpectedFine.deleteExpectedFine;
exports.deleteOneTimeContribution =
  deleteOneTimeContribution.deleteOneTimeContribution;
exports.importLoanFromExcel = importLoanFromExcel.importLoanFromExcel;
exports.updateMemberProfilePicture =
  updateMemberProfilePicture.updateMemberProfilePicture;
exports.setGroupProfilePicture = setGroupProfilePicture.setGroupProfilePicture;
exports.setNextMeetingExcuse = setNextMeetingExcuse.setNextMeetingExcuse;
exports.removeNextMeetingExcuse =
  removeNextMeetingExcuse.removeNextMeetingExcuse;
exports.addNewContributionForApproval =
  addNewContributionForApproval.addNewContributionForApproval;
exports.cancelNewContributionForApproval =
  cancelNewContributionForApproval.cancelNewContributionForApproval;
exports.createNewGroup = createNewGroup.createNewGroup;
exports.updatePassword = updatePassword.updatePassword;
exports.addPastExpenseByMonth = addPastExpenseByMonth.addPastExpenseByMonth;
