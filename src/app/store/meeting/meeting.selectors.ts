import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './meeting.reducer';
import * as fromMember from '../member/member.selectors';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.meetingsFeatureKey);

export const selectIds = createSelector(selectCurrentState, fromReducer.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromReducer.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromReducer.selectAll);
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
  (allItems, member) => allItems.map(item => {
    console.log({member});
    const memberAttended = member ? item.attendance.find(i => i.member_id === member.id) : null;
    return  {
      ... item,
        members: item.attendance
          .filter(i => member && i.member_id !== member.id)
          .map(i => i.member_name)
          .join(', '),
      memberAttended,
    };
  })
);
