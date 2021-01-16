import {GroupProgressEnum} from './group-progress.enum';

export interface GroupProgress {
  title: string;
  buttonLabel: string;
  key: GroupProgressEnum;
  currentContributionType: 'Share' | 'Social' | 'Entry Fee' | 'Other';
  contributionName: string;
}
