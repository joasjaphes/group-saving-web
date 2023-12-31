import {FineType} from '../fine-type/fine-type.model';
import {ContributionType} from '../contribution-type/contribution-type.model';
import {LoanType} from '../loan-type/loan-type.model';
import {LoanQueue} from '../loan-queue/loan-queue.model';
import {Member} from '../member/member.model';
import {SharePeriod} from '../share-period/share-period.model';

export interface Group {
  id: string;
  last_update: number;
  allow_multiple_loan: boolean;
  use_bank: boolean;
  logo: string;
  bank_account_number: string;
  bank_branch: string;
  bank_name: string;
  chairperson: string;
  secretary: string;
  treasure: string;
  group_name: string;
  usage_start_date: string;
  installation_step: string;
  number_of_contributions: number;
  number_of_members: number;
  number_of_loan_types: number;
  members_can_see_all: boolean;
  additional_config: any;
  contribution_frequency: string;
  member_permission?: {
    contributions: string[],
    meetings: string[],
    loan_approval: string[],
    passwordReset?:string[],
  }
  meeting_settings: {
    meeting_frequency: string;
    allow_late_fine: boolean;
    late_fine_amount?: number;
    late_fine_name?: string;
    allow_not_attending_fine: boolean;
    not_attending_fine_amount?: number;
    not_attending_fine_name?: string;
    must_attend: boolean;
    maximum_meetings_to_miss?: number;
  };
  fines: {[id: string]: FineType};
  contributions: {[id: string]: ContributionType};
  loanTypes: {[id: string]: LoanType};
  contribution_balances?: {[id: string]: any};
  loan_queue: LoanQueue[];
  current_balances: any;
  country: string;
  currency: string;
  currency_name: string;
  payment_reference: string;
  has_investment: boolean;
  has_buying_seling_investment: boolean;
  has_long_term_investment: boolean;
  has_share: boolean;
  has_social: boolean;
  has_entry_fee: boolean;
  has_other_contribution: boolean;
  share_set: boolean;
  social_set: boolean;
  entry_fee_set: boolean;
  other_contribution_set: boolean;
  start_month: string;
  start_year: string;
  track_contribution_period: boolean;
  meeting_editors?: string[];
  contribution_editors?: string[];
  settings_editors?: string[];
  next_meeting?: {
    meeting_date: any;
    meeting_place: string;
  };
  chairpersonDetails?: Member;
  secretaryDetails?: Member;
  treasuryDetails?: Member;
  share_periods?: SharePeriod[];
  share_start_date: any;
  share_end_date: any;
}
