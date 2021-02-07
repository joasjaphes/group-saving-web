export interface LoanType {
  interest_rate?: any;
  id: string;
  name: string;
  group_id: string;
  is_active: boolean;
  last_update: number;
  additional_config: any;
  payment_option: string;
  contribution_type_id: string;
  can_go_next_year: boolean;
  description: string;
  duration_type: string;
  is_insured: boolean;
  insurance_percent: number;
  loan_formular: string;
  minimum_amount: number;
  maximum_amount: number;
  max_amount_balance_base: number;
  max_amount_type: string;
  max_duration: number;
  min_duration: number;
  pay_same_amount_is_must: boolean;
  profit_type: string;
  profit_percent: number;
  allow_loan_top_up: boolean;
  textDescription?: string;
}
