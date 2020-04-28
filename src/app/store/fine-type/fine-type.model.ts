export interface FineType {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: any;
  contributionTypeId: string;
  description: string;
  calculation: string;
  isBasedOnBalance: boolean;
  isBasedOnAmountToBePaid: boolean;
  balancePercentage: number;
  amountToBePaidPercentage: number;
  isFixed: boolean;
  fixedAmount: number;
  isBasedOnTime: boolean;
  type: string;
  periodType: string;
  amountPerPeriod: number;
  loanType: string;
  countAsProfit: boolean;
}
