import {GroupProgressEnum} from './group-progress.enum';
import {ContributionTypes} from '../contribution-type/contribution-type.enum';

export interface GroupProgress {
  title: string;
  buttonLabel: string;
  key: GroupProgressEnum;
  currentContributionType?: ContributionTypes;
  contributionName?: string;
  contributionTypeId: string;
}
