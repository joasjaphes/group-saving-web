import {Member} from '../member/member.model';

export interface Payment {
  fineKeys?: string[];
  keys?: string[];
  member?: Member;
  members?: any;
  id: string;
  groupId: string;
  description?: string;
  isActive: boolean;
  last_update: number;
  additionalConfig: any;
  date: string;
  month: string;
  week: string;
  year: string;
  period: string;
  memberId: string;
  paymentMode: string;
  paymentType: string;
  referenceNumber: string;
  contributions: any;
  contributionsDetails?: any[];
  fineDetails?: any[];
  fines: any;
  loans: any;
  is_pending: boolean;
  totalAmount?: number;
  paymentItems?: {
    id: string;
    name: string;
    amount: number;
  }[];
  totalContributions?: number;
  totalFines?: number;
  totalLoans?: number;
}
