import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './login-steps.reducer';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.loginStepsFeatureKey);

export const selectIds = createSelector(selectCurrentState, fromReducer.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromReducer.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromReducer.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromReducer.selectTotal);
export const selectLoading = createSelector(selectCurrentState, fromReducer.getLoading);
export const selectCurrentId = createSelector(selectCurrentState, fromReducer.getSelectedId);
export const selectError = createSelector(selectCurrentState, fromReducer.getError);

export const selectCountry  = createSelector(selectCurrentState, (state) => state.country);
export const selectCurrentStep  = createSelector(selectCurrentState, (state) => state.currentStep);
export const selectPreviousStep  = createSelector(selectCurrentState, (state) => state.previousStep);
export const selectLanguage  = createSelector(selectCurrentState, (state) => state.language);
export const selectPhoneNumber  = createSelector(selectCurrentState, (state) => state.phoneNumber);
export const selectMemberName  = createSelector(selectCurrentState, (state) => state.memberName);
export const selectGroupName  = createSelector(selectCurrentState, (state) => state.groupName);
export const selectEmail  = createSelector(selectCurrentState, (state) => state.email);
export const selectFirstPassword  = createSelector(selectCurrentState, (state) => state.firstPassword);
export const selectSecondPassword  = createSelector(selectCurrentState, (state) => state.secondPassword);
export const selectGroups  = createSelector(selectCurrentState, (state) => state.groups);
export const selectGroupSize  = createSelector(selectCurrentState, (state) => state.groupSize);
export const selectProgressValue  = createSelector(selectCurrentState, (state) => state.progressValue);
export const selectSavingData  = createSelector(selectCurrentState, (state) => state.savingData);

export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
