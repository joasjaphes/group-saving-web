export interface LoanQueue {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: any;
  memberId: string;
  contributionTypeId: string;
  loanTypeId: string;
  expectedLoanDate: string;
  expectedDuration: number;
  durationType: string;
  amountRequested: number;
  amountTaken: number;
  dateProvided: string;
}
