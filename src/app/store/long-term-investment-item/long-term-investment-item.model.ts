export interface LongTermInvestmentItem {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: any;
  date: string;
  month: string;
  week: string;
  year: string;
  investmentTypeId: string;
  amount: number;
  isIn: boolean;
  isOut: boolean;
}
