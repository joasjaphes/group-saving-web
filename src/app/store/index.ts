import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, INIT,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './user/user.reducer';
import * as fromAdjustment from './adjustment/adjustment.reducer';
import * as fromAnnouncement from './announcement/announcement.reducer';
import * as fromBuyingInvestmentDistribution from './buying-investment-distribution/buying-investment-distribution.reducer';
import * as fromBuyingInvestmentItem from './buying-investment-item/buying-investment-item.reducer';
import * as fromCashTransfer from './cash-transfer/cash-transfer.reducer';
import * as fromContributionType from './contribution-type/contribution-type.reducer';
import * as fromContributionTypeBalance from './contribution-type-balance/contribution-type-balance.reducer';
import * as fromExpense from './expense/expense.reducer';
import * as fromExpenseType from './expense-type/expense-type.reducer';
import * as fromFine from './fine/fine.reducer';
import * as fromFineType from './fine-type/fine-type.reducer';
import * as fromGroup from './group/group.reducer';
import * as fromLastUpdatedAt from './last-updated-at/last-updated-at.reducer';
import * as fromLoan from './loan/loan.reducer';
import * as fromLoanPayment from './loan-payment/loan-payment.reducer';
import * as fromLoanQueue from './loan-queue/loan-queue.reducer';
import * as fromLoanType from './loan-type/loan-type.reducer';
import * as fromLongTermInvestmentItem from './long-term-investment-item/long-term-investment-item.reducer';
import * as fromLongTermInvestmentType from './long-term-investment-type/long-term-investment-type.reducer';
import * as fromMeeting from './meeting/meeting.reducer';
import * as fromMember from './member/member.reducer';
import * as fromMemberBalance from './member-balance/member-balance.reducer';
import * as fromMemberGroup from './member-group/member-group.reducer';
import * as fromMemberShare from './member-share/member-share.reducer';
import * as fromPayment from './payment/payment.reducer';
import * as fromPaymentItem from './payment-item/payment-item.reducer';
import * as fromShareDividend from './share-dividend/share-dividend.reducer';
import * as fromShareDividendMember from './share-dividend-member/share-dividend-member.reducer';
import * as fromSharePeriod from './share-period/share-period.reducer';
import * as fromLoginSteps from './login-steps/login-steps.reducer';
import * as fromRouter from '@ngrx/router-store';
import {RouterStateUrl} from './router/router.reducer';
import * as UserActions from './user/user.actions';
import * as fromOneTimePayment from './one-time-payment/one-time-payment.reducer';
import * as fromExpectedFines from './expected-fines/expected-fines.reducer'
import * as fromLoanRequest from './loan-request/loan-request.reducer'


export interface ApplicationState {

  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  [fromUser.usersFeatureKey]: fromUser.State;
  [fromAdjustment.adjustmentsFeatureKey]: fromAdjustment.State;
  [fromAnnouncement.announcementsFeatureKey]: fromAnnouncement.State;
  [fromBuyingInvestmentDistribution.buyingInvestmentDistributionsFeatureKey]: fromBuyingInvestmentDistribution.State;
  [fromBuyingInvestmentItem.buyingInvestmentItemsFeatureKey]: fromBuyingInvestmentItem.State;
  [fromCashTransfer.cashTransfersFeatureKey]: fromCashTransfer.State;
  [fromContributionType.contributionTypesFeatureKey]: fromContributionType.State;
  [fromContributionTypeBalance.contributionTypeBalancesFeatureKey]: fromContributionTypeBalance.State;
  [fromExpense.expensesFeatureKey]: fromExpense.State;
  [fromExpenseType.expenseTypesFeatureKey]: fromExpenseType.State;
  [fromFine.finesFeatureKey]: fromFine.State;
  [fromFineType.fineTypesFeatureKey]: fromFineType.State;
  [fromGroup.groupsFeatureKey]: fromGroup.State;
  [fromLastUpdatedAt.lastUpdatedAtsFeatureKey]: fromLastUpdatedAt.State;
  [fromLoan.loansFeatureKey]: fromLoan.State;
  [fromLoanPayment.loanPaymentsFeatureKey]: fromLoanPayment.State;
  [fromLoanQueue.loanQueuesFeatureKey]: fromLoanQueue.State;
  [fromLoanType.loanTypesFeatureKey]: fromLoanType.State;
  [fromLongTermInvestmentItem.longTermInvestmentItemsFeatureKey]: fromLongTermInvestmentItem.State;
  [fromLongTermInvestmentType.longTermInvestmentTypesFeatureKey]: fromLongTermInvestmentType.State;
  [fromMeeting.meetingsFeatureKey]: fromMeeting.State;
  [fromMember.membersFeatureKey]: fromMember.State;
  [fromMemberBalance.memberBalancesFeatureKey]: fromMemberBalance.State;
  [fromMemberGroup.memberGroupsFeatureKey]: fromMemberGroup.State;
  [fromMemberShare.memberSharesFeatureKey]: fromMemberShare.State;
  [fromSharePeriod.sharePeriodsFeatureKey]: fromSharePeriod.State;
  [fromPayment.paymentsFeatureKey]: fromPayment.State;
  [fromPaymentItem.paymentItemsFeatureKey]: fromPaymentItem.State;
  [fromShareDividend.shareDividendsFeatureKey]: fromShareDividend.State;
  [fromShareDividendMember.shareDividendMembersFeatureKey]: fromShareDividendMember.State;
  [fromLoginSteps.loginStepsFeatureKey]: fromLoginSteps.State;
  [fromOneTimePayment.oneTimePaymentsFeatureKey]: fromOneTimePayment.State;
  [fromExpectedFines.expectedFinesFeatureKey]: fromExpectedFines.State;
  [fromLoanRequest.loanRequestsFeatureKey]: fromLoanRequest.State;
}

export const reducers: ActionReducerMap<ApplicationState> = {

  routerReducer: fromRouter.routerReducer,
  [fromUser.usersFeatureKey]: fromUser.reducer,
  [fromAdjustment.adjustmentsFeatureKey]: fromAdjustment.reducer,
  [fromAnnouncement.announcementsFeatureKey]: fromAnnouncement.reducer,
  [fromBuyingInvestmentDistribution.buyingInvestmentDistributionsFeatureKey]: fromBuyingInvestmentDistribution.reducer,
  [fromBuyingInvestmentItem.buyingInvestmentItemsFeatureKey]: fromBuyingInvestmentItem.reducer,
  [fromCashTransfer.cashTransfersFeatureKey]: fromCashTransfer.reducer,
  [fromContributionType.contributionTypesFeatureKey]: fromContributionType.reducer,
  [fromContributionTypeBalance.contributionTypeBalancesFeatureKey]: fromContributionTypeBalance.reducer,
  [fromExpense.expensesFeatureKey]: fromExpense.reducer,
  [fromExpenseType.expenseTypesFeatureKey]: fromExpenseType.reducer,
  [fromFine.finesFeatureKey]: fromFine.reducer,
  [fromFineType.fineTypesFeatureKey]: fromFineType.reducer,
  [fromGroup.groupsFeatureKey]: fromGroup.reducer,
  [fromLastUpdatedAt.lastUpdatedAtsFeatureKey]: fromLastUpdatedAt.reducer,
  [fromLoan.loansFeatureKey]: fromLoan.reducer,
  [fromLoanPayment.loanPaymentsFeatureKey]: fromLoanPayment.reducer,
  [fromLoanQueue.loanQueuesFeatureKey]: fromLoanQueue.reducer,
  [fromLoanType.loanTypesFeatureKey]: fromLoanType.reducer,
  [fromLongTermInvestmentItem.longTermInvestmentItemsFeatureKey]: fromLongTermInvestmentItem.reducer,
  [fromLongTermInvestmentType.longTermInvestmentTypesFeatureKey]: fromLongTermInvestmentType.reducer,
  [fromMeeting.meetingsFeatureKey]: fromMeeting.reducer,
  [fromMember.membersFeatureKey]: fromMember.reducer,
  [fromMemberBalance.memberBalancesFeatureKey]: fromMemberBalance.reducer,
  [fromMemberGroup.memberGroupsFeatureKey]: fromMemberGroup.reducer,
  [fromMemberShare.memberSharesFeatureKey]: fromMemberShare.reducer,
  [fromSharePeriod.sharePeriodsFeatureKey]: fromSharePeriod.reducer,
  [fromPayment.paymentsFeatureKey]: fromPayment.reducer,
  [fromPaymentItem.paymentItemsFeatureKey]: fromPaymentItem.reducer,
  [fromShareDividend.shareDividendsFeatureKey]: fromShareDividend.reducer,
  [fromShareDividendMember.shareDividendMembersFeatureKey]: fromShareDividendMember.reducer,
  [fromLoginSteps.loginStepsFeatureKey]: fromLoginSteps.reducer,
  [fromOneTimePayment.oneTimePaymentsFeatureKey]: fromOneTimePayment.reducer,
  [fromExpectedFines.expectedFinesFeatureKey]: fromExpectedFines.reducer,
  [fromLoanRequest.loanRequestsFeatureKey]: fromLoanRequest.reducer,
};

export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if ( action != null && action.type === UserActions.logout.type) {
      return reducer( undefined, {type: INIT});
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [logout] : [logout];

export const getRouteState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
  >('routerReducer');
