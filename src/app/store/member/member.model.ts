import {Loan} from '../loan/loan.model';

export interface Member {
  active_loans?: { [id: string]: Loan };
  id: string;
  group_id: string;
  is_active: boolean;
  last_update: number;
  name: string;
  email: string;
  phone_number: string;
  profile_picture: string;
  gender: string;
  date_joined: string;
  can_edit: boolean;
  permissions: any;
  alternative_phone_number: string;
  additional_config: any;
}
