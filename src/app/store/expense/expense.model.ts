export interface Expense {
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
  contributionTypeId: string;
  amount: number;
  expenseTypeId: string;
  description: string;
}
