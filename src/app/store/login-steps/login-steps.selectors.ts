import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromReducer from './login-steps.reducer';
import {RegistrationSteps} from '../../registration/registration-steps';

export const selectCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.loginStepsFeatureKey);

export const selectIds = createSelector(selectCurrentState, fromReducer.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromReducer.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromReducer.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromReducer.selectTotal);
export const selectLoading = createSelector(selectCurrentState, fromReducer.getLoading);
export const selectCurrentId = createSelector(selectCurrentState, fromReducer.getSelectedId);
export const selectError = createSelector(selectCurrentState, fromReducer.getError);

export const selectPhoneCountry = createSelector(selectCurrentState, (state) => state.phoneCountry);
export const selectCountry = createSelector(selectCurrentState, (state) => state.country);
export const selectCurrentStep = createSelector(selectCurrentState, (state) => state.currentStep);
export const selectPreviousStep = createSelector(selectCurrentState, (state) => state.previousStep);
export const selectLanguage = createSelector(selectCurrentState, (state) => state.language);
export const selectPhoneNumber = createSelector(selectCurrentState, (state) => state.phoneNumber);
export const selectMemberName = createSelector(selectCurrentState, (state) => state.memberName);
export const selectGroupName = createSelector(selectCurrentState, (state) => state.groupName);
export const selectEmail = createSelector(selectCurrentState, (state) => state.email);
export const selectFirstPassword = createSelector(selectCurrentState, (state) => state.firstPassword);
export const selectSecondPassword = createSelector(selectCurrentState, (state) => state.secondPassword);
export const selectMemberGroups = createSelector(selectCurrentState, (state) => state.memberGroups);
export const selectGroups = createSelector(selectCurrentState, (state) => state.groups);
export const selectGroupSize = createSelector(selectCurrentState, (state) => state.groupSize);
export const selectSavingData = createSelector(selectCurrentState, (state) => state.savingData);

export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);

export const phoneNumberToUse = createSelector(
  selectPhoneNumber,
  selectPhoneCountry,
  (phoneNumber, phoneCountry) => `+${phoneCountry.phoneCode}${trimPhoneNumber(phoneNumber)}`
);


export const phoneNumberValid = createSelector(
  selectPhoneNumber,
  selectPhoneCountry,
  (phoneNumber, phoneCountry) => {
    const phone = `+${phoneCountry.phoneCode}${trimPhoneNumber(phoneNumber)}`;
    const testRegex = /^\+\d\d\d\d\d\d\d\d\d\d\d\d$/;
    return testRegex.test(phone);
  }
);

export function trimPhoneNumber(value: string) {
  return value && value.length > 1 ? value.trim().substring(value.trim().length - 9) : value;
  // return value && value.length > 1 && value.trim().substring(value.trim().length - 9) === '0'
  //   ? value.trim().substr(1)
  //   : value;
}

export const selectProgressValue = createSelector(
  selectCurrentStep,
  (currentStep) => {
    let progressValue = 12;
    switch (currentStep) {
      case (RegistrationSteps.CountrySelection):
        progressValue = 24;
        break;
      case (RegistrationSteps.PhoneNumber):
        progressValue = 38;
        break;
      case (RegistrationSteps.MemberGroup):
        progressValue = 56;
        break;
      case (RegistrationSteps.MemberName):
        progressValue = 60;
        break;
      case (RegistrationSteps.SetPassword):
        progressValue = 81;
        break;
      case (RegistrationSteps.EnterPassword):
        progressValue = 90;
        break;
      case (RegistrationSteps.ConfirmPassword):
        progressValue = 86;
        break;
      case (RegistrationSteps.CreatingGroup):
        progressValue = 98;
        break;
      case (RegistrationSteps.GroupName):
        progressValue = 70;
        break;
    }
    return progressValue;
  }
);

export const selectObjectToSave = createSelector(
  selectCurrentState,
  phoneNumberToUse,
  (state, phoneNumber) => {
  return {
    email: `${phoneNumber}@monitafrica.com`,
    phoneNumber,
    password: state.firstPassword,
    name: state.memberName,
    memberName: state.memberName,
    groupName: state.groupName,
    numberOfMembers: 1,
    countryCode: state.country.isoCode,
    currency: state.country.currency,
    currencyName: state.country.currencyName,
  };
});
