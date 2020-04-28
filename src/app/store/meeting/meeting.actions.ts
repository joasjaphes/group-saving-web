import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Meeting } from './meeting.model';

export const getMeetings = createAction(
  '[Meeting/API] Get Meetings'
);

export const doneLoadingMeetings = createAction(
  '[Meeting/API] Done Loading Meetings'
);

export const failLoadingMeetings = createAction(
  '[Meeting/API] Error Loading Meetings',
  props<{ error: any }>()
);

export const setSelectedMeeting = createAction(
  '[Meeting/API] Set Selected Meetings',
  props<{ meetingId: string }>()
);

export const loadMeetings = createAction(
  '[Meeting/API] Load Meetings',
  props<{ meetings: Meeting[] }>()
);

export const addMeeting = createAction(
  '[Meeting/API] Add Meeting',
  props<{ meeting: Meeting }>()
);

export const upsertMeeting = createAction(
  '[Meeting/API] Upsert Meeting',
  props<{ meeting: Meeting }>()
);

export const addMeetings = createAction(
  '[Meeting/API] Add Meetings',
  props<{ meetings: Meeting[] }>()
);

export const upsertMeetings = createAction(
  '[Meeting/API] Upsert Meetings',
  props<{ meetings: Meeting[] }>()
);

export const updateMeeting = createAction(
  '[Meeting/API] Update Meeting',
  props<{ meeting: Update<Meeting> }>()
);

export const updateMeetings = createAction(
  '[Meeting/API] Update Meetings',
  props<{ meetings: Update<Meeting>[] }>()
);

export const deleteMeeting = createAction(
  '[Meeting/API] Delete Meeting',
  props<{ id: string }>()
);

export const deleteMeetings = createAction(
  '[Meeting/API] Delete Meetings',
  props<{ ids: string[] }>()
);

export const clearMeetings = createAction(
  '[Meeting/API] Clear Meetings'
);
