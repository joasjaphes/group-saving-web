export interface Payment {
  id: string;
  groupId: string;
  isActive: boolean;
  last_update: number;
  additionalConfig: any;
  date: string;
  month: string;
  week: string;
  year: string;
  memberId: string;
  paymentMode: string;
  paymentType: string;
  referenceNumber: string;
  contributions: any;
  contributionsDetails?: any[];
  fineDetails?: any[];
  fines: any;
  loans: any;
  isPending: boolean;
  totalAmount?: number;
}
