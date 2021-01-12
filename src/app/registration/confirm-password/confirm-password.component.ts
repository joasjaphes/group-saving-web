import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fadeIn, fadeOut, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {RegistrationSteps} from '../registration-steps';
import {setFirstPassword, setSecondPassword} from '../../store/login-steps/login-steps.actions';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class ConfirmPasswordComponent implements OnInit, AfterViewInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() email: string;
  @Input() memberName: string;
  @Input() secondPassword: string;
  @Input() firstPassword: string;
  @Output() nextStep = new EventEmitter< {currentStep: string, previousStep: string, isLast?: boolean}>();
  password: string;
  hide = true;
  @ViewChild('myInput') myInputField: ElementRef;
  constructor(
    private store: Store<ApplicationState>
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => this.myInputField.nativeElement.focus());
  }

  setPassword($event: any) {
    this.store.dispatch(setSecondPassword({secondPassword: $event.target.value}));
  }

  goNextStep() {
    this.nextStep.emit({
      currentStep: RegistrationSteps.CreatingGroup,
      previousStep: RegistrationSteps.ConfirmPassword,
      isLast: true
    });
  }
}
