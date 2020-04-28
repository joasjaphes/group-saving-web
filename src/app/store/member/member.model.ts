export interface Member {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  gender: string;
  dateJoined: string;
  canEdit: boolean;
  permissions: any;
  additionalConfig: any;
}
