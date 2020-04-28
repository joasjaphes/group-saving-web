export interface BuyingInvestmentDistribution {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: any;
  investmentId: string;
  units: number;
  costPerUnit: number;
  unitOfMeasure: string;
  memberId: string;
  unitsSold: number;
  unitsAtHand: number;
  }
