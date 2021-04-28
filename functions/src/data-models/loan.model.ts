export interface SingleLoanModel {
  id: string;
  member_id: string;
  group_id: string;
  account_used: string;
  additional_config: any;
  amount_paid_to_date: number;
  amount_per_return: number;
  amount_taken: number;
  date: any;
  duration: number;
  duration_type: string;
  start_month: string;
  start_year: string;
  end_month: string;
  end_year: string;
  expected_date_of_payment: any;
  loan_used: string;
  remaining_balance: number;
  total_amount_to_pay: number;
  total_profit_contribution: string;
  last_update?: string;
  payments: {
    id: string;
    amount: number;
    date_of_payment: string;
    paid_on_time?: boolean;
    from_previous_loan?: boolean;
    month: string;
    year: string;
    period: string;
    week: string;
    previous_balance: number;
    new_balance: number;
  }[];
}

export interface LoanModel {
  id: string;
  memberId: string;
  groupId: string;
  last_update?: any;
  loans: {
    [id: string]: SingleLoanModel
  };
}
