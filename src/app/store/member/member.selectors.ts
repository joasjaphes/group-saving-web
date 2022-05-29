import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './member.reducer';
import * as fromGroup from '../group/group.selectors';
import {getRouteState} from '../index';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.membersFeatureKey);

export const selectIds = createSelector(selectCurrentState, fromReducer.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromReducer.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromReducer.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromReducer.selectTotal);
export const selectLoading = createSelector(selectCurrentState, fromReducer.getLoading);
export const selectCurrentId = createSelector(selectCurrentState, fromReducer.getSelectedId);
export const selectError = createSelector(selectCurrentState, fromReducer.getError);

export const selectDetailed = createSelector(
  selectAll, (allItems) => allItems.map(member => ({
    ...member,
    subtitle: member.additional_config && member.additional_config.have_other_account && !member.additional_config.is_primary ? '(second Account)' : ''
  }))
);

export const selectUnique = createSelector(
  selectDetailed, (allItems) => allItems
    .filter(item  => !item.subtitle )
)

export const selectExceptMember = (phoneNumber: string) => createSelector(
  selectDetailed, (allItems) => allItems
    .filter(item => item.phone_number !== phoneNumber )
)

export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);

export const selectFirstNameOnly = createSelector(
  selected,
  (member) => member && member.name ? member.name.split(' ')[0] : ''
);

export const selectMemberName = createSelector(
  selected,
  (member) => member ? member.name : ''
);

export const selectMemberFromRoute = createSelector(
  selectEntities,
  getRouteState,
  (entities, routeState) => {
    const memberId = routeState.state && routeState.state.params ? routeState.state.params.id : null;
    return entities[memberId];
  }
);



export const selectMembersSorted = createSelector(
  selectDetailed,
  selectCurrentId,
  (allMembers, currentMemberId) => {
    const member = allMembers.find(i => i.id === currentMemberId);
    const otherMembers = allMembers
      .filter(i => i.id !== currentMemberId)
      .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    return [member, ...otherMembers];
  }
);
