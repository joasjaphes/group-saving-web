export interface LoanType {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: any;
  paymentOption: string;
  contributionTypeId: string;
  canGoNextYear: boolean;
  description: string;
  durationType: string;
  isInsured: boolean;
  insurancePercent: number;
  loanFormular: string;
  minimumAmount: number;
  maximumAmount: number;
  maxAmountBalanceBase: string;
  maxAmountType: string;
  maxDuration: number;
  minDuration: number;
  paySameAmountIsMust: boolean;
  profitType: string;
  profitPercent: number;
  allowLoanTopUp: boolean;
}
