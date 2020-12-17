import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LoginStep } from './login-steps.model';
import {Country} from '../countries';
import {Group} from '../group/group.model';



export const setCountry = createAction(
  '[LoginStep/API] Set Country',
  props<{ country: Country }>()
);

export const setPhoneCountry = createAction(
  '[LoginStep/API] Set Phone Country',
  props<{ country: Country }>()
);

export const goNextStep = createAction(
  '[LoginStep/API] Go Next Step',
);

export const setNextStep = createAction(
  '[LoginStep/API] Go Next Step',
  props<{currentStep: string, previousStep: string}>()
);

export const goPreviousStep = createAction(
  '[LoginStep/API] Go Previous Step',
);

export const setCurrentStep = createAction(
  '[LoginStep/API] Set Current Step',
  props<{ currentStep: string }>()
);

export const setPreviousStep = createAction(
  '[LoginStep/API] Set Previous Step',
  props<{ previousStep: string }>()
);

export const setLanguage = createAction(
  '[LoginStep/API] Set Language',
  props<{ language: string }>()
);

export const setPhoneNumber = createAction(
  '[LoginStep/API] Set PhoneNumber',
  props<{ phoneNumber: string }>()
);

export const setMemberName = createAction(
  '[LoginStep/API] Set Member Name',
  props<{ memberName: string }>()
);

export const setGroupName = createAction(
  '[LoginStep/API] Set Group Name',
  props<{ groupName: string }>()
);

export const setMemberGroups = createAction(
  '[LoginStep/API] Set Member Groups',
  props<{ memberGroups: any[] }>()
);

export const setGroupSize = createAction(
  '[LoginStep/API] Set Group Size',
  props<{ groupSize: number }>()
);

export const setProgressValue = createAction(
  '[LoginStep/API] Set Progress Value',
  props<{ progressValue: number }>()
);

export const setEmail = createAction(
  '[LoginStep/API] Set Email',
  props<{ email: string }>()
);

export const setFirstPassword = createAction(
  '[LoginStep/API] Set firstPassword',
  props<{ firstPassword: string }>()
);

export const setSecondPassword = createAction(
  '[LoginStep/API] Set Second Password',
  props<{ secondPassword: string }>()
);

export const setGroups = createAction(
  '[LoginStep/API] Set Groups',
  props<{ groups: Group[] }>()
);

export const setSavingData = createAction(
  '[LoginStep/API] Set Saving Data',
  props<{ savingData: boolean }>()
);




export const getLoginSteps = createAction(
  '[LoginStep/API] Get LoginSteps'
);

export const doneLoadingLoginSteps = createAction(
  '[LoginStep/API] Done Loading LoginSteps'
);

export const failLoadingLoginSteps = createAction(
  '[LoginStep/API] Error Loading LoginSteps',
  props<{ error: any }>()
);

export const setSelectedLoginStep = createAction(
  '[LoginStep/API] Set Selected LoginSteps',
  props<{ loginStepId: string }>()
);

export const loadLoginSteps = createAction(
  '[LoginStep/API] Load LoginSteps',
  props<{ loginSteps: LoginStep[] }>()
);

export const addLoginStep = createAction(
  '[LoginStep/API] Add LoginStep',
  props<{ loginStep: LoginStep }>()
);

export const upsertLoginStep = createAction(
  '[LoginStep/API] Upsert LoginStep',
  props<{ loginStep: LoginStep }>()
);

export const addLoginSteps = createAction(
  '[LoginStep/API] Add LoginSteps',
  props<{ loginSteps: LoginStep[] }>()
);

export const upsertLoginSteps = createAction(
  '[LoginStep/API] Upsert LoginSteps',
  props<{ loginSteps: LoginStep[] }>()
);

export const updateLoginStep = createAction(
  '[LoginStep/API] Update LoginStep',
  props<{ loginStep: Update<LoginStep> }>()
);

export const updateLoginSteps = createAction(
  '[LoginStep/API] Update LoginSteps',
  props<{ loginSteps: Update<LoginStep>[] }>()
);

export const deleteLoginStep = createAction(
  '[LoginStep/API] Delete LoginStep',
  props<{ id: string }>()
);

export const deleteLoginSteps = createAction(
  '[LoginStep/API] Delete LoginSteps',
  props<{ ids: string[] }>()
);

export const clearLoginSteps = createAction(
  '[LoginStep/API] Clear LoginSteps'
);
