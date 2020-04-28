export interface LoanPayment {
  id: string;
  period: string;
  month: string;
  year: string;
  groupId: string;
  amount: number;
  profitPerPay: number;
  paidOnTime: boolean;
  fines: number;
  dateOfPayment: string;
  memberId: string;
  loanId: string;
  fine: string;
}
