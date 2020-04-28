import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Meeting } from './meeting.model';
import * as MeetingActions from './meeting.actions';

export const meetingsFeatureKey = 'meetings';

export interface State extends EntityState<Meeting> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<Meeting> = createEntityAdapter<Meeting>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});


export const reducer = createReducer(
  initialState,
  on(MeetingActions.getMeetings, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(MeetingActions.doneLoadingMeetings, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(MeetingActions.failLoadingMeetings, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(MeetingActions.setSelectedMeeting, ((state, action) => {
      return {...state, selected: action.meetingId};
    })
  ),
  on(MeetingActions.addMeeting,
    (state, action) => adapter.addOne(action.meeting, state)
  ),
  on(MeetingActions.upsertMeeting,
    (state, action) => adapter.upsertOne(action.meeting, state)
  ),
  on(MeetingActions.addMeetings,
    (state, action) => adapter.addMany(action.meetings, state)
  ),
  on(MeetingActions.upsertMeetings,
    (state, action) => adapter.upsertMany(action.meetings, state)
  ),
  on(MeetingActions.updateMeeting,
    (state, action) => adapter.updateOne(action.meeting, state)
  ),
  on(MeetingActions.updateMeetings,
    (state, action) => adapter.updateMany(action.meetings, state)
  ),
  on(MeetingActions.deleteMeeting,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(MeetingActions.deleteMeetings,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(MeetingActions.loadMeetings,
    (state, action) => adapter.setAll(action.meetings, state)
  ),
  on(MeetingActions.clearMeetings,
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
