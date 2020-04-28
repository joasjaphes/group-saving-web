export interface PaymentItem {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: any;
  date: string;
  month: string;
  week: string;
  year: string;
  memberId: string;
  paymentMode: string;
  paymentType: string;
  referenceNumber: string;
  contributionTypeId: string;
  amount: number;
  isLoan: boolean;
  isFine: boolean;
  isNormal: boolean;
  isLoanOut: boolean;
  transactionId: string;
}
