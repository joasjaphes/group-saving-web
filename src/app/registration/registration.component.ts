import {Component, Input, OnInit} from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../shared/animations/router-animation';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {first, map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../store';
import {Back} from '../store/router/router.action';
import {Country} from '../store/countries';
import {Group} from '../store/group/group.model';
import * as loginSelector from '../store/login-steps/login-steps.selectors';
import {goNextStep, goPreviousStep, setCountry, setNextStep, setPhoneNumber} from '../store/login-steps/login-steps.actions';
import {RegistrationSteps} from './registration-steps';
import {MemberGroup} from '../store/member-group/member-group.model';
import {selectObjectToSave} from '../store/login-steps/login-steps.selectors';
import {FunctionsService} from '../services/functions.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [fadeIn]
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

  showFirst = false;
  showSecond = false;
  showThird = false;
  showForth = false;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<ApplicationState>,
    private functionsService: FunctionsService,
    private authService: AuthService
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
    setTimeout(() => this.showFirst = true, 100);
    setTimeout(() => this.showSecond = true, 2000);
    setTimeout(() => this.showThird = true, 4000);
    setTimeout(() => this.showForth = true, 6000);
  }

  goBack() {
    // this.store.dispatch(new Back());
    this.store.dispatch(goPreviousStep());
  }

  setCountry(country: Country) {
    this.store.dispatch(setCountry({country}));
  }

  goNextStep(result: {currentStep: any, previousStep: any, isLast?: boolean}) {
    const {currentStep, previousStep, isLast} = result;
    this.store.dispatch(setNextStep({currentStep, previousStep}));
    if (isLast) {
      this.save().then();
    }
  }

  async save() {
    const data = await this.store.pipe(select(selectObjectToSave)).pipe(first()).toPromise();
    const memberGroups = await this.memberGroups$.pipe(first()).toPromise();
    const url = memberGroups && memberGroups.length > 0 ? 'createUserOnly' : 'createUser';
    const response: any = await this.functionsService.saveData(url, data);
    await this.authService.login(data.email, data.password);
  }

  setPhoneNumber(phoneNumber: string) {
    this.store.dispatch(setPhoneNumber({phoneNumber}));
  }
}
