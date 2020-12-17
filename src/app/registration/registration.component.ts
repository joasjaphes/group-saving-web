import {Component, Input, OnInit} from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../shared/animations/router-animation';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../store';
import {Back} from '../store/router/router.action';
import {Country} from '../store/countries';
import {Group} from '../store/group/group.model';
import * as loginSelector from '../store/login-steps/login-steps.selectors';
import {goNextStep, goPreviousStep, setCountry, setNextStep, setPhoneNumber} from '../store/login-steps/login-steps.actions';
import {RegistrationSteps} from './registration-steps';
import {MemberGroup} from '../store/member-group/member-group.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Input() progressValue: number;
  @Input() progressTitle = 'Progress';
  @Input() backTitle = 'Back';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  registrationSteps = RegistrationSteps;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  country$: Observable<Country>;
  phoneCountry$: Observable<Country>;
  currentStep$: Observable<string>;
  previousStep$: Observable<string>;
  language$: Observable<string>;
  phoneNumber$: Observable<string>;
  phoneNumberValid$: Observable<boolean>;
  memberName$: Observable<string>;
  groupName$: Observable<string>;
  email$: Observable<string>;
  groupSize$: Observable<number>;
  progressValue$: Observable<number>;
  firstPassword$: Observable<string>;
  secondPassword$: Observable<string>;
  memberGroups$: Observable<MemberGroup[]>;
  groups$: Observable<Group[]>;
  savingData$: Observable<boolean>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<ApplicationState>
  ) {
    this.country$ = this.store.pipe(select(loginSelector.selectCountry));
    this.phoneCountry$ = this.store.pipe(select(loginSelector.selectPhoneCountry));
    this.currentStep$ = this.store.pipe(select(loginSelector.selectCurrentStep));
    this.previousStep$ = this.store.pipe(select(loginSelector.selectPreviousStep));
    this.language$ = this.store.pipe(select(loginSelector.selectLanguage));
    this.phoneNumber$ = this.store.pipe(select(loginSelector.selectPhoneNumber));
    this.memberName$ = this.store.pipe(select(loginSelector.selectMemberName));
    this.groupName$ = this.store.pipe(select(loginSelector.selectGroupName));
    this.email$ = this.store.pipe(select(loginSelector.selectEmail));
    this.groupSize$ = this.store.pipe(select(loginSelector.selectGroupSize));
    this.progressValue$ = this.store.pipe(select(loginSelector.selectProgressValue));
    this.firstPassword$ = this.store.pipe(select(loginSelector.selectFirstPassword));
    this.secondPassword$ = this.store.pipe(select(loginSelector.selectSecondPassword));
    this.groups$ = this.store.pipe(select(loginSelector.selectGroups));
    this.savingData$ = this.store.pipe(select(loginSelector.selectSavingData));
    this.memberGroups$ = this.store.pipe(select(loginSelector.selectMemberGroups));
    this.phoneNumberValid$ = this.store.pipe(select(loginSelector.phoneNumberValid));
  }

  ngOnInit(): void {
  }

  goBack() {
    // this.store.dispatch(new Back());
    this.store.dispatch(goPreviousStep());
  }

  setCountry(country: Country) {
    this.store.dispatch(setCountry({country}));
  }

  goNextStep({currentStep, previousStep}) {
    this.store.dispatch(setNextStep({currentStep, previousStep}));
  }

  setPhoneNumber(phoneNumber: string) {
    this.store.dispatch(setPhoneNumber({phoneNumber}));
  }
}
