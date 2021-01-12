import {RouterEffects} from './router/router.effect';
import {UserEffects} from './user/user.effects';
import {AdjustmentEffects} from './adjustment/adjustment.effects';
import {AnnouncementEffects} from './announcement/announcement.effects';
import {BuyingInvestmentDistributionEffects} from './buying-investment-distribution/buying-investment-distribution.effects';
import {BuyingInvestmentItemEffects} from './buying-investment-item/buying-investment-item.effects';
import {BuyingInvestmentTypeEffects} from './buying-investment-type/buying-investment-type.effects';
import {CashTransferEffects} from './cash-transfer/cash-transfer.effects';
import {ContributionTypeEffects} from './contribution-type/contribution-type.effects';
import {ContributionTypeBalanceEffects} from './contribution-type-balance/contribution-type-balance.effects';
import {ExpenseEffects} from './expense/expense.effects';
import {ExpenseTypeEffects} from './expense-type/expense-type.effects';
import {FineEffects} from './fine/fine.effects';
import {FineTypeEffects} from './fine-type/fine-type.effects';
import {GroupEffects} from './group/group.effects';
import {LastUpdatedAtEffects} from './last-updated-at/last-updated-at.effects';
import {LoanEffects} from './loan/loan.effects';
import {LoanPaymentEffects} from './loan-payment/loan-payment.effects';
import {LoanQueueEffects} from './loan-queue/loan-queue.effects';
import {LoanTypeEffects} from './loan-type/loan-type.effects';
import {LoginStepsEffects} from './login-steps/login-steps.effects';
import {LongTermInvestmentItemEffects} from './long-term-investment-item/long-term-investment-item.effects';
import {LongTermInvestmentTypeEffects} from './long-term-investment-type/long-term-investment-type.effects';
import {MeetingEffects} from './meeting/meeting.effects';
import {MemberEffects} from './member/member.effects';
import {MemberBalanceEffects} from './member-balance/member-balance.effects';
import {MemberGroupEffects} from './member-group/member-group.effects';
import {MemberShareEffects} from './member-share/member-share.effects';
import {PaymentEffects} from './payment/payment.effects';
import {PaymentItemEffects} from './payment-item/payment-item.effects';
import {ShareDividendEffects} from './share-dividend/share-dividend.effects';
import {ShareDividendMemberEffects} from './share-dividend-member/share-dividend-member.effects';



export const effects: any[] = [
  RouterEffects,
  UserEffects,
  AdjustmentEffects,
  AnnouncementEffects,
  BuyingInvestmentDistributionEffects,
  BuyingInvestmentItemEffects,
  BuyingInvestmentTypeEffects,
  CashTransferEffects,
  ContributionTypeEffects,
  ContributionTypeBalanceEffects,
  ExpenseEffects,
  ExpenseTypeEffects,
  FineEffects,
  FineTypeEffects,
  GroupEffects,
  LastUpdatedAtEffects,
  LoanEffects,
  LoanPaymentEffects,
  LoanQueueEffects,
  LoanTypeEffects,
  LoginStepsEffects,
  LongTermInvestmentItemEffects,
  LongTermInvestmentTypeEffects,
  MeetingEffects,
  MemberEffects,
  MemberBalanceEffects,
  MemberGroupEffects,
  MemberShareEffects,
  PaymentEffects,
  PaymentItemEffects,
  ShareDividendEffects,
  ShareDividendMemberEffects,
];
