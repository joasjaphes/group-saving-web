import {Member} from '../member/member.model';
import {ContributionType} from '../contribution-type/contribution-type.model';

export interface OneTimePayment {
  id: string;
  groupId: string;
  memberId: string;
  contributionId: string;
  last_update: string;
  amount: number;
  date: string;
  paymentMode: string;
  referenceNumber: string;
  member?: Member;
  contributionType?: ContributionType;
}
