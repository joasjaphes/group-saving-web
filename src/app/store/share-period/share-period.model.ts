export interface SharePeriod {
  id: string;
  isCurrent?: boolean;
  startMonth: string;
  endMonth: string;
  start: { month: {id: string, name: string}, year: any };
  end: { month: {id: string, name: string}, year: any };
}
