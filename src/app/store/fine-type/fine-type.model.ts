export interface FineType {
  id: string;
  group_id: string;
  is_active: boolean;
  last_update: number;
  additional_config: any;
  contribution_type_id: string;
  description: string;
  calculation: string;
  is_based_on_balance: boolean;
  is_based_on_amount_to_be_paid: boolean;
  balance_percentage: number;
  amount_to_be_paid_percentage: number;
  is_fixed: boolean;
  fixed_amount: number;
  is_based_on_time: boolean;
  type: string;
  period_type: string;
  amount_per_period: number;
  loan_type: string;
  loan_type_id: string;
  meeting_type: string;
  count_as_profit: boolean;
}
