export interface CashTransfer {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: any;
  date: string;
  month: string;
  week: string;
  year: string;
  fromContributionTypeId: string;
  toContributionTypeId: string;
  amount: number;
}
