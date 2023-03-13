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
      interestRate?: { [id: string]: number },
      baseAmount?: { [id: string]: number },
      startingAmount: { [id: string]: number },
      referenceNumber: string;
      paymentMode: string;
      fileUrl?: string;
      secondFileUrl?:string;
      confirmationMessage?: string;
      date: any
    }
  };
}
