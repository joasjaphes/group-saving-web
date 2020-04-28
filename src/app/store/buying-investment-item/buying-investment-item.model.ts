export interface BuyingInvestmentItem {
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
  isFromMember: boolean;
}
