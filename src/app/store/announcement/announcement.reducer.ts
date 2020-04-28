import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Announcement } from './announcement.model';
import * as AnnouncementActions from './announcement.actions';

export const announcementsFeatureKey = 'announcements';

export interface State extends EntityState<Announcement> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<Announcement> = createEntityAdapter<Announcement>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(AnnouncementActions.getAnnouncements, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(AnnouncementActions.doneLoadingAnnouncements, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(AnnouncementActions.failLoadingAnnouncements, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(AnnouncementActions.setSelectedAnnouncement, ((state, action) => {
      return {...state, selected: action.announcementId};
    })
  ),
  on(AnnouncementActions.addAnnouncement,
    (state, action) => adapter.addOne(action.announcement, state)
  ),
  on(AnnouncementActions.upsertAnnouncement,
    (state, action) => adapter.upsertOne(action.announcement, state)
  ),
  on(AnnouncementActions.addAnnouncements,
    (state, action) => adapter.addMany(action.announcements, state)
  ),
  on(AnnouncementActions.upsertAnnouncements,
    (state, action) => adapter.upsertMany(action.announcements, state)
  ),
  on(AnnouncementActions.updateAnnouncement,
    (state, action) => adapter.updateOne(action.announcement, state)
  ),
  on(AnnouncementActions.updateAnnouncements,
    (state, action) => adapter.updateMany(action.announcements, state)
  ),
  on(AnnouncementActions.deleteAnnouncement,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(AnnouncementActions.deleteAnnouncements,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(AnnouncementActions.loadAnnouncements,
    (state, action) => adapter.setAll(action.announcements, state)
  ),
  on(AnnouncementActions.clearAnnouncements,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
export const getSelectedId = (state: State) => state.selected;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getError = (state: State) => state.error;
