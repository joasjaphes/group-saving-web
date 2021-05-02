import {LoanType} from '../loan-type/loan-type.model';
import {Member} from '../member/member.model';

export interface Loan {
  id: string;
  group_id: string;
  isActive: boolean;
  last_update: number;
  additional_config: any;
  date: string;
  member_id: string;
  member?: Member;
  memberName?: string;
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
  payments: {
    amount: number;
    previous_balance: number;
    new_balance: number;
    date_of_payment: string;
    date: string;
    from_previous_loan: boolean;
    id: string;
    member_id: string;
    month: any;
    week: any;
    paid_on_time: boolean;
    payment_mode: string;
    payment_type: string;
    period: string;
    reference_number: string;
    year: any
  }[];
  fines: {
    amount: number;
    date: string;
    fine_id: string;
    id: string;
    member_id: string;
    month: any;
    year: any;
  }[];
  durationName?: any;
  percentPaid?: any;
  monthData?: any;

}
