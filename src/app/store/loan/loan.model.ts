
export interface Loan {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: any;
  date: string;
  memberId: string;
  contributionTypeId: string;
  loanTypeId: string;
  duration: number;
  durationType: string;
  amountTaken: number;
  amountPerReturn: number;
  totalProfitContribution: number;
  amountPaidToDate: number;
  remainingBalance: number;
  insuranceAmount: number;
  expectedDateOfPayment: string;
  endMonth: string;
  endYear: string;
  endWeek: string;
  startMonth: string;
  startYear: string;
  startWeek: string;
  payments: any;
  fines: any;
}
