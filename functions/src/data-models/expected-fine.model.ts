export interface ExpectedFineModel {
  id: string;
  fines: {
    id: string;
    groupId: string;
    month: string;
    year: string;
    period: string;
    week: string;
    memberId: string;
    fines: { [id: string]: number },
    date: any
  }[]
}
