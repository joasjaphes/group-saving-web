export interface SingleExpenseModel {
  id: string;
  group_id: string;
  amount: number;
  associated_account: string;
  date: string;
  month: string;
  reason: string;
  last_update: number;
  is_active: boolean;
  associated_member_id: string;
  additional_config: any;
  year: string;
}
export interface ExpenseModel {
  id: string;
  year: string;
  group_id: string;
  expenses: {[id: string]: SingleExpenseModel};
}
