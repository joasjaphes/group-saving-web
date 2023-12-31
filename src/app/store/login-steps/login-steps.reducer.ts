import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LoginStep } from './login-steps.model';
import * as LoginStepActions from './login-steps.actions';
import {Country} from '../countries';
import {Group} from '../group/group.model';
import {RegistrationSteps} from '../../registration/registration-steps';

export const loginStepsFeatureKey = 'loginSteps';

export interface State extends EntityState<LoginStep> {
  selected: string;
  loading: boolean;
  loaded: boolean;
  error: any;
  country: Country;
  phoneCountry: Country;
  currentStep: string;
  previousStep: string;
  language: string;
  phoneNumber: string;
  memberName: string;
  groupName: string;
  memberGroups: any[];
  email: string;
  groupSize: number;
  progressValue: number;
  firstPassword: string;
  secondPassword: string;
  groups: Group[];
  savingData: boolean;
}

export const adapter: EntityAdapter<LoginStep> = createEntityAdapter<LoginStep>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false,
  error: null,
  country: null,
  phoneCountry: null,
  currentStep: RegistrationSteps.CountrySelection,
  previousStep: '',
  language: '',
  phoneNumber: '',
  memberName: '',
  groupName: '',
  memberGroups: [],
  email: '',
  groupSize: null,
  progressValue: 12,
  firstPassword: '',
  secondPassword: '',
  groups: [],
  savingData: false,
});


export const reducer = createReducer(
  initialState,
  on(LoginStepActions.goNextStep, ((state, action) => {
    let currentStep = '';
    if (state.currentStep === RegistrationSteps.CountrySelection) {
      currentStep = RegistrationSteps.PhoneNumber;
    }
    return {...state,  currentStep, previousStep: state.currentStep};
    })
  ),

  on(LoginStepActions.goPreviousStep, ((state, action) => {
    return {...state, currentStep: state.previousStep};
    })
  ),

  on(LoginStepActions.setNextStep, ((state, {currentStep, previousStep}) => {
    return {...state, currentStep, previousStep};
    })
  ),

  on(LoginStepActions.setCountry, ((state, action) => {
      return {...state, country: action.country, phoneCountry: action.country};
    })
  ),

  on(LoginStepActions.setPhoneCountry, ((state, action) => {
      return {...state, phoneCountry: action.country};
    })
  ),

  on(LoginStepActions.setMemberGroups, ((state, {memberGroups}) => {
    const memberName = memberGroups.length > 0 ? memberGroups[0].memberName : '';
    console.log(memberName);
    return {...state, memberGroups, memberName};
    })
  ),

  on(LoginStepActions.setCurrentStep, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setPreviousStep, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setGroupSize, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setEmail, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setProgressValue, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setLanguage, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setPhoneNumber, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setMemberName, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setGroupName, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setFirstPassword, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setSecondPassword, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setGroups, ((state, action) => {
      return {...state, ...action};
    })
  ),

  on(LoginStepActions.setSavingData, ((state, action) => {
      return {...state, ...action};
    })
  ),








  on(LoginStepActions.getLoginSteps, ((state, action) => {
      return {...state, loading: true, error: null};
    })
  ),
  on(LoginStepActions.doneLoadingLoginSteps, ((state, action) => {
      return {...state, loading: false, error: null};
    })
  ),
  on(LoginStepActions.failLoadingLoginSteps, ((state, action) => {
      return {...state, loading: false, error: action.error};
    })
  ),
  on(LoginStepActions.setSelectedLoginStep, ((state, action) => {
      return {...state, selected: action.loginStepId};
    })
  ),
  on(LoginStepActions.addLoginStep,
    (state, action) => adapter.addOne(action.loginStep, state)
  ),
  on(LoginStepActions.upsertLoginStep,
    (state, action) => adapter.upsertOne(action.loginStep, state)
  ),
  on(LoginStepActions.addLoginSteps,
    (state, action) => adapter.addMany(action.loginSteps, state)
  ),
  on(LoginStepActions.upsertLoginSteps,
    (state, action) => adapter.upsertMany(action.loginSteps, state)
  ),
  on(LoginStepActions.updateLoginStep,
    (state, action) => adapter.updateOne(action.loginStep, state)
  ),
  on(LoginStepActions.updateLoginSteps,
    (state, action) => adapter.updateMany(action.loginSteps, state)
  ),
  on(LoginStepActions.deleteLoginStep,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LoginStepActions.deleteLoginSteps,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LoginStepActions.loadLoginSteps,
    (state, action) => adapter.setAll(action.loginSteps, state)
  ),
  on(LoginStepActions.clearLoginSteps,
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
