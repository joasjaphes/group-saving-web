export interface MemberShare {
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
  amountPaid: number;
  numberOfSharesIfEqual: number;
  numberOfSharesIfGrowing: number;
  pricePerShareIfEqual: number;
  pricePerShareIfGrowing: number;
}
