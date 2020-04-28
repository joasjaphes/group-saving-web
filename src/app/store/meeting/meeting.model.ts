export interface Meeting {
  id: string;
  groupId: string;
  isActive: boolean;
  lastUpdate: number;
  additionalConfig: any;
  date: string;
  month: string;
  week: string;
  year: string;
  excuses: any;
  isSet: boolean;
  placeDescription: string;
  attendance: any;
  placeLocationUrl: string;
  latitude: string;
  longitude: string;
  notes: string;
}
