export interface Adjustment {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: string;
  date: string;
  month: string;
  week: string;
  year: string;
  contributionTypeId: string;
  oldBalance: number;
  newBalance: number;
  amount: number;
  appliedToGroup: boolean;
  appliedToMember: boolean;
  memberId: string;
  reason: string;
}
