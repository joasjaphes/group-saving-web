export interface SingleMeeting {
  attendance: any;
  date: string;
  excuses: any[];
  id: string;
  is_set: boolean;
  month: string;
  week: string;
  notes: string;
  year: string;
  place: string;
  reasons: any;
  additional_config: any;
}

export interface MeetingModel {
  id: string;
  year: string;
  meetings: {
    [id: string]: SingleMeeting
  };
}
