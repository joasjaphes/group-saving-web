import {Member} from '../member/member.model';
import {ContributionType} from '../contribution-type/contribution-type.model';

export interface ExpectedFine {
  id: string;
  groupId: string;
  month: string;
  year: string;
  period: string;
  week: string;
  memberId: string;
  fines: { [id: string]: number };
  date: any;
  last_update: any;
  description?: string;
  paymentItems?: {
    id: string;
    name: string;
    amount: number;
  }[];
  totalFines?: number;
  member?: Member;
}
