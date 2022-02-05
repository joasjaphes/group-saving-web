export interface PaymentModel {
  id: string;
  groupId: string;
  month: string;
  year: string;
  period: string;
  week: string;
  members: {
    [id: string]: {
      memberId: string;
      id: string;
      contributions: { [id: string]: number },
      fines: { [id: string]: number },
      loans: { [id: string]: number },
      startingAmount: { [id: string]: number },
      referenceNumber: string;
      paymentMode: string;
      date: any
    }
  };
}
