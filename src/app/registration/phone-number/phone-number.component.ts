import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {countries, Country} from '../../store/countries';
import {FunctionsService} from '../../services/functions.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store';
import * as loginStepSelector from '../../store/login-steps/login-steps.selectors';
import {MatSelectChange} from '@angular/material/select';
import {setEmail, setMemberGroups, setMemberName, setPhoneCountry} from '../../store/login-steps/login-steps.actions';
import {trimPhoneNumber} from '../../store/login-steps/login-steps.selectors';
import {RegistrationSteps} from '../registration-steps';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss'],
  animations: [fadeIn]
})
export class PhoneNumberComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  countries = countries;
  selectedCountry: string;
  @Input() country: Country;
  @Input() currentPhoneNumber: string;
  @Input() phoneNumberValid: boolean;
  @Output() nextStep = new EventEmitter< {currentStep: string, previousStep: string}>();
  @Output() setPhoneNumber = new EventEmitter<string>();
  fetchingPhoneUpdates = false;
  phoneNumber: string;
  constructor(
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>
  ) { }

  ngOnInit(): void {
    if (this.country) {
      this.selectedCountry = this.country.phoneCode;
    }
    if (this.currentPhoneNumber) {
      this.phoneNumber = this.currentPhoneNumber;
    }
  }

  async verifyPhoneNumber() {
    this.fetchingPhoneUpdates = true;
    try {
      const phoneNumber = `+${this.selectedCountry}${trimPhoneNumber(this.phoneNumber)}`;
      const response: any = await this.functionsService.saveData('getUserByPhoneNumber', {phoneNumber});
      this.fetchingPhoneUpdates = false;
      // User has already registered promt user to enter password
      if (response.userRecord !== null) {
        this.store.dispatch(setMemberGroups({memberGroups: []}));
        this.store.dispatch(setMemberName({memberName: response.userRecord.displayName}));
        this.store.dispatch(setEmail({email: response.userRecord.email}));
        this.goNextStep({currentStep: RegistrationSteps.EnterPassword, previousStep: RegistrationSteps.PhoneNumber});
      } else if (response.userData !== null)  {
        if (response.userData.length === 0)  {
          this.store.dispatch(setMemberGroups({memberGroups: []}));
          this.goNextStep({currentStep: RegistrationSteps.MemberName, previousStep: RegistrationSteps.PhoneNumber});
        } else {
          this.store.dispatch(setMemberGroups({memberGroups: response.userData}));
        }
      }
      console.log(JSON.stringify(response));
    } catch (e) {
      console.error(e);
      this.fetchingPhoneUpdates = false;
    }
  }

  setPhoneCountry($event: MatSelectChange) {
    const country = this.countries.find(i => i.phoneCode === $event.value);
    this.store.dispatch(setPhoneCountry({country}));
  }

  goNextStep({currentStep, previousStep}) {
    this.nextStep.emit({currentStep, previousStep});
  }
}
