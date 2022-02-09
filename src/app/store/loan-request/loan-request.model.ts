import {Member} from '../member/member.model';
import {ContributionType} from '../contribution-type/contribution-type.model';
import {LoanType} from '../loan-type/loan-type.model';

export interface LoanRequest {
  id: string;
  memberId: string;
  groupId: string;
  loanTypeId: string;
  loanId: string;
  approvalStatus: string;
  approvals: any;
  guarantors: string[];
  loanType?: LoanType;
  member?: Member;
  last_updated: string;
}
