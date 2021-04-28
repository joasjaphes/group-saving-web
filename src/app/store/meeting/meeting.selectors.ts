import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromReducer from './meeting.reducer';
import * as fromMember from '../member/member.selectors';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.meetingsFeatureKey);

export const selectIds = createSelector(selectCurrentState, fromReducer.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromReducer.selectEntities);
export const selectAllMeetings = createSelector(selectCurrentState, fromReducer.selectAll);
export const selectAll = createSelector(selectAllMeetings, (allItems) => allItems.filter(i => !i.deleted));
export const selectTotal = createSelector(selectCurrentState, fromReducer.selectTotal);
export const selectLoading = createSelector(selectCurrentState, fromReducer.getLoading);
export const selectCurrentId = createSelector(selectCurrentState, fromReducer.getSelectedId);
export const selectError = createSelector(selectCurrentState, fromReducer.getError);

export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);

export const selectDetailed = createSelector(
  selectAll,
  fromMember.selected,
  fromMember.selectEntities,
  (allItems, member, memberEntities) => allItems.map(item => {
    const attendanceDetailed = item.attendance.filter(i => !!memberEntities[i]).map(i => {
      const memberData = memberEntities[i];
      return {
        member_id: memberData.id,
        name: memberData.name,
      };
    });
    const memberAttended = member ? attendanceDetailed.find(i => i.member_id === member.id) : null;
    const attending = attendanceDetailed.length < 5 ? attendanceDetailed : attendanceDetailed.slice(0, 4);
    let membersNames = attending
      .filter(i => member && i.member_id !== member.id)
      .map(i => i.name.split(' ')[0])
      .join(', ');
    if (item.attendance.length > 5) {
      const remainingMembers = item.attendance.length - 5;
      membersNames += ' and ' + remainingMembers + ' more';
    }
    return {
      ...item,
      members: membersNames,
      truncatedNotes: item.notes.length > 40 ? item.notes.substr(0, 40) + '...' : item.notes,
      memberAttended,
    };
  })
);
