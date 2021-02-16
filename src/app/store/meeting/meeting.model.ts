export interface Meeting {
  id: string;
  group_id: string;
  isActive: boolean;
  last_update: number;
  additional_config: any;
  date: string;
  month: string;
  week: string;
  year: string;
  excuses: any;
  place: string;
  attendance: {
    member_id: string;
    member_name: string;
  }[];
  members?: string;
  memberAttended?: any;
  place_location_url: string;
  latitude: string;
  longitude: string;
  notes: string;
  truncatedNotes?: string;
  deleted?: boolean;
}
