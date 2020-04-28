export interface ContributionType {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: any;
  allowLoan: boolean;
  allowLateFine: boolean;
  collectionFrequency: string;
  description: string;
  isHisa: boolean;
  hisaValue: number;
  newHisaValue: number;
  hisaValueType: string;
  hisaDistributionStrategy: string;
  isFixed: boolean;
  fixedValue: number;
  isOneTimeContribution: boolean;
  fineIsSet: boolean;
  loanIsSet: boolean;
  minimumContribution: number;
  isMust: boolean;
  lastMonthOfContribution: string;
  name: string;
  managedBy: string;
  membersCanSeeOthers: boolean;
  dayOfContribution: string;
}
