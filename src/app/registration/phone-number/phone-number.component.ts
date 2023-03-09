import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  fadeIn,
  fadeOut,
  ROUTE_ANIMATIONS_ELEMENTS,
} from '../../shared/animations/router-animation';
import { countries, Country } from '../../store/countries';
import { FunctionsService } from '../../services/functions.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../store';
import * as loginStepSelector from '../../store/login-steps/login-steps.selectors';
import { MatSelectChange } from '@angular/material/select';
import {
  setEmail,
  setMemberGroups,
  setMemberName,
  setPhoneCountry,
} from '../../store/login-steps/login-steps.actions';
import { trimPhoneNumber } from '../../store/login-steps/login-steps.selectors';
import { RegistrationSteps } from '../registration-steps';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class PhoneNumberComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  countries = countries;
  selectedCountry: string = '+255';
  @Input() country: Country;
  @Input() currentPhoneNumber: string;
  @Input() phoneNumberValid: boolean;
  @Output() nextStep = new EventEmitter<{
    currentStep: string;
    previousStep: string;
  }>();
  @Output() setPhoneNumber = new EventEmitter<string>();
  fetchingPhoneUpdates = false;
  phoneNumber: string;
  @ViewChild('myInput') myInputField: ElementRef;

  constructor(
    private functionsService: FunctionsService,
    private store: Store<ApplicationState>
  ) {}

  ngOnInit(): void {
    const localPhone = localStorage.getItem('group-saving-user-phone-number');
    if(localPhone) {
      this.phoneNumber = localPhone;
    }
    this.store.select(loginStepSelector.selectCountry).subscribe((country) => {
      console.log(country);
      if (country) {
        this.selectedCountry = this.country.phoneCode;
      }
      if (this.currentPhoneNumber) {
        this.phoneNumber = this.currentPhoneNumber;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.myInputField.nativeElement.focus());
  }

  selectPhone(event: any) {
    localStorage.setItem('group-saving-user-phone-number', event.target.value);
    this.setPhoneNumber.emit(event.target.value);
  }

  async verifyPhoneNumber() {
    this.fetchingPhoneUpdates = true;
    try {
      const phoneNumber = `+${this.selectedCountry}${trimPhoneNumber(
        this.phoneNumber
      )}`;
      const response: any = await this.functionsService.saveData(
        'getUserByPhoneNumber',
        { phoneNumber }
      );
      console.log(JSON.stringify(response));
      this.fetchingPhoneUpdates = false;
      // User has already registered promt user to enter password
      if (response.userRecord !== null) {
        this.store.dispatch(setMemberGroups({ memberGroups: [] }));
        this.store.dispatch(
          setMemberName({ memberName: response.userRecord.displayName })
        );
        this.store.dispatch(setEmail({ email: response.userRecord.email }));
        this.goNextStep({
          currentStep: RegistrationSteps.EnterPassword,
          previousStep: RegistrationSteps.PhoneNumber,
        });
      } else if (response.userData !== null) {
        if (response.userData.length === 0) {
          this.store.dispatch(setMemberGroups({ memberGroups: [] }));
          this.goNextStep({
            currentStep: RegistrationSteps.MemberName,
            previousStep: RegistrationSteps.PhoneNumber,
          });
        } else {
          this.store.dispatch(
            setMemberGroups({
              memberGroups: response.userData.map((user) => ({
                id: user.id,
                phoneNumber: user.phone_number,
                memberId: user.member_id,
                groupName: user.group_name,
                userId: user.user_id,
                createdBy: user.created_by,
                lastUpdate: user.last_update,
                groupId: user.group_id,
                memberName: user.member_name,
              })),
            })
          );
          this.goNextStep({
            currentStep: RegistrationSteps.MemberGroup,
            previousStep: RegistrationSteps.PhoneNumber,
          });
        }
      }
      console.log(JSON.stringify(response));
    } catch (e) {
      console.error(e);
      this.fetchingPhoneUpdates = false;
    }
  }

  setPhoneCountry($event: MatSelectChange) {
    const country = this.countries.find((i) => i.phoneCode === $event.value);
    this.store.dispatch(setPhoneCountry({ country }));
  }

  goNextStep({ currentStep, previousStep }) {
    this.nextStep.emit({ currentStep, previousStep });
  }
}
