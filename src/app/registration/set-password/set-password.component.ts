import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fadeIn, fadeOut, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {RegistrationSteps} from '../registration-steps';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class SetPasswordComponent implements OnInit, AfterViewInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() email: string;
  @Input() memberName: string;
  @Output() nextStep = new EventEmitter< {currentStep: string, previousStep: string}>();
  password: string;
  @ViewChild('myInput') myInputField: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => this.myInputField.nativeElement.focus());
  }

  goNextStep() {
    this.nextStep.emit({
      currentStep: RegistrationSteps.ConfirmPassword,
      previousStep: RegistrationSteps.SetPassword
    });
  }
}
