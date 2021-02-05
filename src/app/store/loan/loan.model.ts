import {LoanType} from '../loan-type/loan-type.model';

export interface Loan {
  id: string;
  group_id: string;
  isActive: boolean;
  last_update: number;
  additional_config: any;
  date: string;
  member_id: string;
  account_used: string;
  loanType?: LoanType;
  loan_used: string;
  duration: number;
  duration_type: string;
  amount_taken: number;
  amount_per_return: number;
  total_amount_to_pay: number;
  total_profit_contribution: number;
  amount_paid_to_date: number;
  remaining_balance: number;
  insurance_amount: number;
  expected_date_of_payment: string;
  end_month: string;
  end_year: string;
  endWeek: string;
  start_month: string;
  start_year: string;
  start_week: string;
  payments: any;
  fines: any;
  durationName?: any;

}
