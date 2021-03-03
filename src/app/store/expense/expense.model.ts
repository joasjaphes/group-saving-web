import {Member} from '../member/member.model';

export interface Expense {
  id: string;
  group_id: string;
  is_active: boolean;
  last_update: number;
  additional_config: any;
  date: string;
  month: string;
  week: string;
  year: string;
  deleted: boolean;
  associated_member_id: string;
  member?: Member;
  associated_account: string;
  amount: number;
  expense_type_id: string;
  reason: string;
}
