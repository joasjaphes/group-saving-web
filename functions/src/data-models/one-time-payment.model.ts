export interface OneTimePaymentModel {
  id: string;
  groupId: string;
  contributionId: string;
  members: {
    [id: string]: {
      memberId: string;
      id: string;
      amount: number;
      referenceNumber: string;
      paymentMode: string;
      date: any
    }
  };
}
