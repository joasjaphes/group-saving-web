import {ContributionTypes} from './contribution-type.enum';

export interface ContributionType {
  id: string;
  type: ContributionTypes;
  group_id: string;
  is_active: boolean;
  last_update: number;
  additional_config: any;
  allow_loan: boolean;
  allow_late_fine: boolean;
  collection_frequency: string;
  description: string;
  is_hisa: boolean;
  hisa_value: number;
  new_hisa_value: number;
  hisa_value_type: string;
  hisa_distribution_strategy: string;
  is_fixed: boolean;
  fixed_value: number;
  is_one_time_contribution: boolean;
  fine_is_set: boolean;
  loan_is_set: boolean;
  minimum_contribution: number;
  is_must: boolean;
  last_month_of_contribution: string;
  name: string;
  textDescription?: string;
  managed_by?: string;
  members_can_see_others: boolean;
  day_of_contribution: string;
  track_balance: boolean;
  is_fine_allowed?: boolean;
  fine_period_type?: string;
  fine_calculation?: string;
  fine_amount_per_period?: number;
}
