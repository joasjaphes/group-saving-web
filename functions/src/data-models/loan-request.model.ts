export interface LoanRequestModel {
  id: string;
  loans: {
    id: string;
    memberId: string;
    groupId: string;
    loanTypeId: string;
    loanId: string;
    approvalStatus: string;
    approvals: any;
    guarantors: string[];
  }[]
}
