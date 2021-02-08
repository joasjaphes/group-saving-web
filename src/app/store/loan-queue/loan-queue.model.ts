import {LoanType} from '../loan-type/loan-type.model';
import {Member} from '../member/member.model';

export interface LoanQueue {
  id: string;
  group_id: string;
  lastUpdate: number;
  additional_config: any;
  member_id: string;
  loan_type_id: string;
  date: string;
  month: string;
  year: string;
  amount: number;
  member?: Member;
  loanType?: LoanType;
}
