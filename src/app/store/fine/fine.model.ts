import { FineType } from "../fine-type/fine-type.model";

export interface Fine {
  id: string;
  group_id: string;
  isActive: boolean;
  last_update: number;
  additional_config: any;
  date: string;
  month: string;
  week: string;
  year: string;
  member_id: string;
  payment_mode: string;
  payment_type: string;
  reference_number: string;
  fine_id: string;
  fineType?: FineType;
  amount: number;
}

export enum FineCalculationType {
  FIXED = "Fixed",
  DAILY = "Amount per day",
  WEEKLY = "Amount per week",
  MONTHLY = "Amount per month",
}
