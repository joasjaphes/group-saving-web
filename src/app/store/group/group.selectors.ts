import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromReducer from './group.reducer';
import * as fromMember from '../member/member.selectors';
import * as fromLoan from '../loan-type/loan-type.selectors';
import * as fromContribution from '../contribution-type/contribution-type.selectors';
import {GroupProgressEnum} from './group-progress.enum';
import {ContributionTypes} from '../contribution-type/contribution-type.enum';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.groupsFeatureKey);

export const selectIds = createSelector(selectCurrentState, fromReducer.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromReducer.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromReducer.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromReducer.selectTotal);
export const selectLoading = createSelector(selectCurrentState, fromReducer.getLoading);
export const selectCurrentId = createSelector(selectCurrentState, fromReducer.getSelectedId);
export const selectError = createSelector(selectCurrentState, fromReducer.getError);

export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities,
  selectCurrentId,
  fromMember.selectEntities,
  (entities, id, members) => {
    const group = entities[id];
    const chairpersonDetails = group ? members[group.chairperson] : null;
    const secretaryDetails = group ? members[group.secretary] : null;
    const treasuryDetails = group ? members[group.treasure] : null;
    return {
      ...group,
      chairpersonDetails,
      secretaryDetails,
      treasuryDetails,
    };
  }
);

export const nextMeeting = createSelector(
  selected,
  (group) => group && group.next_meeting && group.next_meeting.meeting_date ? group.next_meeting : null
);

export const selectSharePeriod = createSelector(
  selected,
  (group) => group.share_periods
)

export const selectProgressPercent = createSelector(
  selected,
  fromLoan.selectAll,
  fromContribution.selectAll,
  fromMember.selectAll,
  (
    selectedGroup,
    loanTypes,
    contributionTypes,
    members
  ) => {
    if (selectedGroup) {
      let requiredContributions = 0;
      let availableContributions = 0;
      let percent = 12;
      if (members.length > 1) {
        percent += 16;
      }
      if (selectedGroup.meeting_settings && selectedGroup.meeting_settings.meeting_frequency) {
        percent += 7;
      }
      if (selectedGroup.currency) {
        percent += 8;
      }
      if (selectedGroup.has_share || selectedGroup.has_entry_fee || selectedGroup.has_social || selectedGroup.has_other_contribution) {
        percent += 10;
      }
      const share_exist = !!contributionTypes.find(i => i.type === 'Share');
      requiredContributions = selectedGroup.has_share ? requiredContributions += 1 : requiredContributions;
      const entry_fee_exist = !!contributionTypes.find(i => i.type === 'Entry Fee');
      requiredContributions = selectedGroup.has_entry_fee ? requiredContributions += 1 : requiredContributions;
      const social_exist = !!contributionTypes.find(i => i.type === 'Social');
      requiredContributions = selectedGroup.has_social ? requiredContributions += 1 : requiredContributions;
      const other_exist = !!contributionTypes.find(i => i.type === 'Other');
      requiredContributions = selectedGroup.has_other_contribution ? requiredContributions += 1 : requiredContributions;
      if (requiredContributions !== 0) {
        const contrSteps = 16 / requiredContributions;
        percent += 16 - parseInt(contrSteps + '', 10) * requiredContributions;
        if (selectedGroup.has_share && share_exist) {
          percent += parseInt(contrSteps + '', 10);
          availableContributions += 1;
        }
        if (selectedGroup.has_entry_fee && entry_fee_exist) {
          percent += parseInt(contrSteps + '', 10);
          availableContributions += 1;
        }
        if (selectedGroup.has_social && social_exist) {
          percent += parseInt(contrSteps + '', 10);
          availableContributions += 1;
        }
        if (selectedGroup.has_other_contribution && other_exist) {
          percent += parseInt(contrSteps + '', 10);
          availableContributions += 1;
        }
      }
      if (contributionTypes.length > 0 && availableContributions >= requiredContributions) {
        // check for balance issues
        const contr_need_balance = contributionTypes.filter(i => i.track_balance);
        const steps1 = contr_need_balance.length === 0 ? 5 : 5 / contr_need_balance.length;
        const difference1 = 5 - parseInt(steps1 + '', 10) * contr_need_balance.length;
        percent += difference1;
        for (const contr of contr_need_balance) {
          if (selectedGroup.contribution_balances && !!(selectedGroup.contribution_balances[contr.id] + '')) {
            percent += parseInt(steps1 + '', 10);
          }
        }
        // check for loan configuration
        const contr_need_loan = contributionTypes.filter(i => i.allow_loan);
        const steps = contr_need_loan.length === 0 ? 16 : 16 / contr_need_loan.length;
        const difference = 16 - parseInt(steps + '', 10) * contr_need_loan.length;
        percent += difference;
        for (const contr of contr_need_loan) {
          if (loanTypes.find(i => i.contribution_type_id === contr.id)) {
            percent += parseInt(steps + '', 10);
          }
        }
      }
      if (!!selectedGroup.chairperson && !!selectedGroup.treasure && !!selectedGroup.secretary) {
        percent += 5;
      }
      if (selectedGroup.meeting_settings) {
        if (selectedGroup.meeting_settings.meeting_frequency === 'No Meeting') {
          percent += 5;
        } else {
          if (!(selectedGroup.meeting_settings.must_attend == null || selectedGroup.meeting_settings.must_attend === undefined)) {
            percent += 5;
          }
        }
      }
      return percent;
    }
    return 12;
  }
);

/**
 * This selector will return the current progress of setting up the group
 * the return will be {title: string, buttonLabel: string}
 */
export const selectProgress = createSelector(
  selected,
  fromLoan.selectAll,
  fromContribution.selectAll,
  fromMember.selectAll,
  (
    selectedGroup,
    loanTypes,
    contributionTypes,
    members
  ) => {
    let title = 'Update Your Group Information';
    let buttonLabel = 'Add information';
    let key = GroupProgressEnum.AddBasicInformation;
    let currentContributionType: ContributionTypes;
    let contributionName = '';
    let contributionTypeId = '';
    if (selectedGroup) {
      const share_exist = !!contributionTypes.find(i => i.type === 'Share');
      const entry_fee_exist = !!contributionTypes.find(i => i.type === 'Entry Fee');
      const social_exist = !!contributionTypes.find(i => i.type === 'Social');
      const other_exist = !!contributionTypes.find(i => i.type === 'Other');
      const contributionNeedsBalance = contributionTypes.filter(i => i.track_balance);
      const contributionHasBalance = contributionTypes.filter(i => i.track_balance && selectedGroup.contribution_balances && !!(selectedGroup.contribution_balances[i.id] + ''));
      const uncreatedLoans = contributionTypes
        .filter(i => i.allow_loan)
        .filter(i => !loanTypes.find(k => k.contribution_type_id === i.id));
      if (!(selectedGroup.meeting_settings && selectedGroup.meeting_settings.meeting_frequency)) {
        title = 'Add basic group information';
        buttonLabel = 'Add group information';
        key = GroupProgressEnum.AddBasicInformation;
      } else if (!(selectedGroup.currency)) {
        title = 'Select Currency';
        buttonLabel = 'Set Currency';
        key = GroupProgressEnum.SetCurrency;
      } else if (!(selectedGroup.has_share || selectedGroup.has_entry_fee || selectedGroup.has_social || selectedGroup.has_other_contribution)) {
        title = 'Define group contribution types';
        buttonLabel = 'Set contribution types';
        key = GroupProgressEnum.SetContributionType;
      } else if (selectedGroup.has_share && !share_exist) {
        title = 'Add information about share contribution';
        buttonLabel = 'Add Share contribution details';
        key = GroupProgressEnum.AddContribution;
        currentContributionType = ContributionTypes.Share;
        contributionName = 'Share';
      } else if (selectedGroup.has_entry_fee && !entry_fee_exist) {
        title = 'Add information about entry fee';
        buttonLabel = 'Add Entry fee details';
        key = GroupProgressEnum.AddContribution;
        currentContributionType = ContributionTypes.EntryFee;
        contributionName = 'Entry Fee';
      } else if (selectedGroup.has_social && !social_exist) {
        title = 'Add information about social contribution';
        buttonLabel = 'Add Social contribution details';
        key = GroupProgressEnum.AddContribution;
        currentContributionType = ContributionTypes.Social;
        contributionName = 'Social Contribution';
      } else if (selectedGroup.has_other_contribution && !other_exist) {
        title = 'Add information about other contribution';
        buttonLabel = 'Add Other contribution details';
        key = GroupProgressEnum.AddContribution;
        currentContributionType = ContributionTypes.Other;
        contributionName = '';
      } else if (
        contributionTypes.length > 0
        && uncreatedLoans.length > 0
      ) {
        const contr_need_loan = contributionTypes.filter(i => i.allow_loan);
        for (const contr of contr_need_loan) {
          if (!loanTypes.find(i => i.contribution_type_id === contr.id)) {
            currentContributionType = contr.type;
            contributionTypeId = contr.id;
            title = 'Add information about loan from ' + contr.name;
            buttonLabel = 'Add Loan Information';
            key = GroupProgressEnum.AddLoanInformation;
          }
        }
      } else if (!(selectedGroup.meeting_settings && !(selectedGroup.meeting_settings.must_attend === null || selectedGroup.meeting_settings.must_attend === undefined))) {
        title = 'Define group meeting rules';
        buttonLabel = 'Add Meeting rules';
        key = GroupProgressEnum.AddMeetingInformation;
      } else if (members.length === 1) {
        title = 'You are the only one in group, add other members';
        buttonLabel = 'Add members';
        key = GroupProgressEnum.AddMembers;
      } else if (!(!!selectedGroup.chairperson && !!selectedGroup.treasure && !!selectedGroup.secretary)) {
        title = 'Define group leadership information';
        buttonLabel = 'Add leadership information';
        key = GroupProgressEnum.AddLeadershipInformation;
      } else if (
        contributionTypes.length > 0
        && contributionNeedsBalance.length !== contributionHasBalance.length
      ) {
        console.log(contributionHasBalance)
        console.log(contributionNeedsBalance)
        title = 'To help to track group information fill the current balances';
        buttonLabel = 'Add starting balances';
        key = GroupProgressEnum.AddContributionBalances;
      }
      return {
        title,
        buttonLabel,
        key,
        currentContributionType,
        contributionName,
        contributionTypeId,
      };
    }
    return {
      title,
      buttonLabel,
      key,
      currentContributionType,
      contributionName,
      contributionTypeId,
    };
  }
);

export const selectNeedBalance = createSelector(
  selected,
  fromContribution.selectAll, (currentGroup, allItems) => allItems
    .filter(i => {
      const hasBalance = currentGroup && currentGroup.current_balances && !!currentGroup.current_balances[i.id];
      return i.track_balance && !hasBalance;
    })
);

export const selectPermissions = createSelector(
  selected,
  (currentGroup) => currentGroup?.member_permission
);

export const selectCurrentMember = createSelector(
  fromMember.selectEntities,
  selectEntities,
  (members, groups) => {
    const memberId = localStorage.getItem('group_savings_current_member');
    let member = members[memberId]
    if (member) {
      const group = groups[member.group_id];
      console.log({group});
      member = {
        ...member,
        can_edit: group ? group.chairperson === member.id || group.secretary === member.id || group.treasure === member.id :  false,
      }
    }
    return member;
  }
)
