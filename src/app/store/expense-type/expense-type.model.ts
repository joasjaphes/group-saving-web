export interface ExpenseType {
  id: string;
  groupId: string;
  isActive: boolean;
  additionalConfig: any;
  lastUpdate: number;
  name: string;
  applyToGroup: boolean;
  applyToMember: boolean;
}
