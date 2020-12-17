import {getGroups} from './group/group.actions';
import {getAdjustments} from './adjustment/adjustment.actions';
import {getAnnouncements} from './announcement/announcement.actions';
import {getBuyingInvestmentDistributions} from './buying-investment-distribution/buying-investment-distribution.actions';
import {getBuyingInvestmentItems} from './buying-investment-item/buying-investment-item.actions';
import {getCashTransfers} from './cash-transfer/cash-transfer.actions';
import {getContributionTypeBalances} from './contribution-type-balance/contribution-type-balance.actions';
import {getContributionTypes} from './contribution-type/contribution-type.actions';
import {getExpenses} from './expense/expense.actions';
import {getExpenseTypes} from './expense-type/expense-type.actions';
import {getFines} from './fine/fine.actions';
import {getFineTypes} from './fine-type/fine-type.actions';
import {getLoanPayments} from './loan-payment/loan-payment.actions';
import {getLoanQueues} from './loan-queue/loan-queue.actions';
import {getLoans} from './loan/loan.actions';
import {getLoanTypes} from './loan-type/loan-type.actions';
import {getLongTermInvestmentItems} from './long-term-investment-item/long-term-investment-item.actions';
import {getLongTermInvestmentTypes} from './long-term-investment-type/long-term-investment-type.actions';
import {getMeetings} from './meeting/meeting.actions';
import {getMemberBalances} from './member-balance/member-balance.actions';
import {getMemberGroups} from './member-group/member-group.actions';
import {getMemberShares} from './member-share/member-share.actions';
import {getMembers} from './member/member.actions';
import {getPaymentItems} from './payment-item/payment-item.actions';
import {getPayments} from './payment/payment.actions';
import {getShareDividendMembers} from './share-dividend-member/share-dividend-member.actions';
import {getShareDividends} from './share-dividend/share-dividend.actions';

export enum DataKeys {
  LastUpdatedTable = 'updated',
  Adjustments = 'adjustment',
  Announcement = 'announcement',
  BuyingInvestmentDistribution = 'buying_investment_distribution',
  BuyingInvestmentItem = 'buying_investment_item',
  BuyingInvestmentType = 'buying_investment_type',
  CashTransfer = 'cash_transfer',
  ContributionTypeBalance = 'contribution_type_balance',
  ContributionType = 'contribution_type',
  Expense = 'expense',
  ExpenseType = 'expense_type',
  Fine = 'fine',
  FineType = 'fine_type',
  Group = 'group',
  LoanPayment = 'loan_payment',
  LoanQueue = 'loan_queue',
  Loan = 'loan',
  LoanType = 'loan_type',
  LongTermInvestmentItem = 'long_term_investment_item',
  LongTermInvestmentType = 'long_term_investment_type',
  Meeting = 'meeting',
  MemberBalance = 'member_balance',
  MemberGroup = 'member_group',
  MemberShare = 'member_share',
  Member = 'member',
  PaymentItem = 'payment_item',
  Payments = 'payments',
  ShareDividendMember = 'share_dividend_member',
  ShareDividend = 'share_dividend',
  User = 'user',
}

export const GET_METHODS = {
  [DataKeys.Adjustments]: getAdjustments(),
  [DataKeys.Announcement]: getAnnouncements(),
  [DataKeys.BuyingInvestmentDistribution]: getBuyingInvestmentDistributions(),
  [DataKeys.BuyingInvestmentItem]: getBuyingInvestmentItems(),
  [DataKeys.BuyingInvestmentType]: getBuyingInvestmentItems(),
  [DataKeys.CashTransfer]: getCashTransfers(),
  [DataKeys.ContributionTypeBalance]: getContributionTypeBalances(),
  [DataKeys.ContributionType]: getContributionTypes(),
  [DataKeys.Expense]: getExpenses(),
  [DataKeys.ExpenseType]: getExpenseTypes(),
  [DataKeys.Fine]: getFines(),
  [DataKeys.FineType]: getFineTypes(),
  [DataKeys.Group]: getGroups(),
  [DataKeys.LoanPayment]: getLoanPayments(),
  [DataKeys.LoanQueue]: getLoanQueues(),
  [DataKeys.Loan]: getLoans(),
  [DataKeys.LoanType]: getLoanTypes(),
  [DataKeys.LongTermInvestmentItem]: getLongTermInvestmentItems(),
  [DataKeys.LongTermInvestmentType]: getLongTermInvestmentTypes(),
  [DataKeys.Meeting]: getMeetings(),
  [DataKeys.MemberBalance]: getMemberBalances(),
  [DataKeys.MemberGroup]: getMemberGroups(),
  [DataKeys.MemberShare]: getMemberShares(),
  [DataKeys.Member]: getMembers(),
  [DataKeys.PaymentItem]: getPaymentItems(),
  [DataKeys.Payments]: getPayments(),
  [DataKeys.ShareDividendMember]: getShareDividendMembers(),
  [DataKeys.ShareDividend]: getShareDividends(),
};
