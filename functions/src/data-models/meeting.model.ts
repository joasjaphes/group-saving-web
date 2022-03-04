export interface SingleMeeting {
  attendance: any;
  missed: any;
  date: string;
  excuses: any;
  id: string;
  is_set: boolean;
  month: string;
  week: string;
  notes: string;
  year: string;
  place: string;
  reasons: any;
  meetingPhoto: string;
  additional_config: any;
}

export interface MeetingModel {
  id: string;
  year: string;
  group_id: string;
  meetings: {
    [id: string]: SingleMeeting
  };
}
