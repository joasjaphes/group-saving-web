import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Announcement } from './announcement.model';

export const getAnnouncements = createAction(
  '[Announcement/API] Get Announcements'
);

export const doneLoadingAnnouncements = createAction(
  '[Announcement/API] Done Loading Announcements'
);

export const failLoadingAnnouncements = createAction(
  '[Announcement/API] Error Loading Announcements',
  props<{ error: any }>()
);

export const setSelectedAnnouncement = createAction(
  '[Announcement/API] Set Selected Announcements',
  props<{ announcementId: string }>()
);

export const loadAnnouncements = createAction(
  '[Announcement/API] Load Announcements',
  props<{ announcements: Announcement[] }>()
);

export const addAnnouncement = createAction(
  '[Announcement/API] Add Announcement',
  props<{ announcement: Announcement }>()
);

export const upsertAnnouncement = createAction(
  '[Announcement/API] Upsert Announcement',
  props<{ announcement: Announcement }>()
);

export const addAnnouncements = createAction(
  '[Announcement/API] Add Announcements',
  props<{ announcements: Announcement[] }>()
);

export const upsertAnnouncements = createAction(
  '[Announcement/API] Upsert Announcements',
  props<{ announcements: Announcement[] }>()
);

export const updateAnnouncement = createAction(
  '[Announcement/API] Update Announcement',
  props<{ announcement: Update<Announcement> }>()
);

export const updateAnnouncements = createAction(
  '[Announcement/API] Update Announcements',
  props<{ announcements: Update<Announcement>[] }>()
);

export const deleteAnnouncement = createAction(
  '[Announcement/API] Delete Announcement',
  props<{ id: string }>()
);

export const deleteAnnouncements = createAction(
  '[Announcement/API] Delete Announcements',
  props<{ ids: string[] }>()
);

export const clearAnnouncements = createAction(
  '[Announcement/API] Clear Announcements'
);
