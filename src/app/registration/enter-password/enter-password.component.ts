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
  ROUTE_ANIMATIONS_ELEMENTS,
} from '../../shared/animations/router-animation';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { trimPhoneNumber } from 'src/app/store/login-steps/login-steps.selectors';
import { RegistrationSteps } from '../registration-steps';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss'],
  animations: [fadeIn],
})
export class EnterPasswordComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() email: string;
  @Input() memberName: string;
  @Input() phoneNumber: string;
  @Input() alreadyLogedInBefore = false;
  @Output() nextStep = new EventEmitter<{
    currentStep: string;
    previousStep: string;
  }>();
  password: string;
  countryCode: string;
  hide = true;
  @ViewChild('myInput') myInputField: ElementRef;
  loading: any;

  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    const localEmail = localStorage.getItem('group-saving-user-email');
    const localCode = localStorage.getItem('group-saving-country-code');
    const logedInBefore = localStorage.getItem('group-saving-arleady-loged-in');
    if (localEmail && localCode) {
      this.alreadyLogedInBefore = logedInBefore == '1';
      this.email = localEmail;
      this.phoneNumber = `+${localCode}${trimPhoneNumber(this.phoneNumber)}`;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.myInputField.nativeElement.focus());
  }

  changePhone() {
    localStorage.removeItem('group-saving-arleady-loged-in');
    this.nextStep.emit({
      currentStep: RegistrationSteps.PhoneNumber,
      previousStep: RegistrationSteps.CountrySelection,
    });
  }

  async login() {
    this.loading = true;
    try {
      await this.authService.login(this.email, this.password);
      localStorage.setItem('group-saving-arleady-loged-in', '1');
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Incorrect Username or Password');
    }
  }
}
