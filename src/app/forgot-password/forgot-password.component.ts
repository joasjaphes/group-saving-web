import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { FunctionsService } from '../services/functions.service';
import { fadeIn, fadeInOut } from '../shared/animations/router-animation';
import { ApplicationState } from '../store';
import { countries } from '../store/countries';
import {
  selectEmail,
  selectMemberName,
  selectPhoneNumber,
  trimPhoneNumber,
} from '../store/login-steps/login-steps.selectors';
import { Go } from '../store/router/router.action';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeIn, fadeInOut],
})
export class ForgotPasswordComponent implements OnInit {
  memberName$: Observable<string>;
  phoneNumber: string;
  messagePhoneNumber: string;
  countryCode: string;
  country;
  countries = countries;
  selectedCountry = '';
  loading = false;
  messageReceived = false;
  otp: string = '';
  email: string = '';
  sendingOtp = false;
  isCorrectOtp = false;
  newPassword: string;
  confirmNewPassword: string;
  changingPassword = false;
  memberName: string;
  firstOtp: string;
  secondOtp: string;
  thirdOtp: string;
  fourthOtp: string;
  fifthOtp: string;
  sixthOtp: string;

  constructor(
    private store: Store<ApplicationState>,
    private functionsService: FunctionsService,
    private authService: AuthService,
    private angularFire: AngularFireAuth,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.memberName$ = this.store.pipe(
      select(selectMemberName),
      first((i) => !!i)
    );
    this.memberName = localStorage.getItem('group-saving-user-name');
    const localPhone = localStorage.getItem('group-saving-user-phone-number');
    const localCode = localStorage.getItem('group-saving-country-code');
    this.selectedCountry = localCode;
    this.phoneNumber = localPhone;
    this.messagePhoneNumber = localPhone;
    this.angularFire.authState.subscribe((user) => {
      if (user) {
        console.log('User', user);
      }
    });
    // this.authService
  }

  get otpString() {
    return `${this.firstOtp}${this.secondOtp}${this.thirdOtp}${this.fourthOtp}${this.fifthOtp}${this.sixthOtp}`;
  }

  get trimmedPhoneNumber() {
    return `+${this.selectedCountry}${trimPhoneNumber(this.phoneNumber)}`;
  }

  get trimmedMessagePhoneNumber() {
    return `+${this.selectedCountry}${trimPhoneNumber(
      this.messagePhoneNumber
    )}`;
  }

  get generatedOtp() {
    let str = '';
    while (str.length < 6) {
      const ran = Math.floor(Math.random() * 10);
      str += ran + '';
    }
    return str;
  }

  goBack() {
    this.store.dispatch(new Go({ path: ['', 'welcome', 'registration'] }));
  }

  async sendMessage() {
    this.isCorrectOtp = false;
    this.loading = true;
    try {
      const dataToSave = {
        phoneNumber: this.trimmedPhoneNumber,
        messagePhoneNumber: this.trimmedMessagePhoneNumber,
        memberName: this.memberName,
        password: this.generatedOtp,
        sendNotification: true,
        should_reset_password: false,
      };
      console.log('phone number', this.trimmedPhoneNumber);
      await this.functionsService.saveData('updatePassword', dataToSave);
      document.getElementById('firstOtp')?.focus();

      this.messageReceived = true;
    } catch (e) {
      console.error(e);
    }
    this.loading = false;
  }

  onOtpInput(currentId, nextId, value) {
    if (value) {
      document.getElementById(currentId).blur();
      document.getElementById(nextId).focus();
    }
  }

  async onSubmitOtp() {
    this.sendingOtp = true;
    try {
      const email = `${this.trimmedPhoneNumber}@monitafrica.com`;
      const result = await this.authService.login(email, this.otpString);
      this.isCorrectOtp = true;
    } catch (e) {
      console.error('Failed', e);
    }
    this.sendingOtp = false;
  }

  async changePassword() {
    this.changingPassword = true;
    try {
      const email = `${this.trimmedPhoneNumber}@monitafrica.com`;
      await this.authService.changePassword(this.otpString, this.newPassword);
      await this.authService.login(email, this.newPassword);
      this.store.dispatch(new Go({ path: [''] }));
      this.commonService.showSuccess('Password changed successfully');
    } catch (e) {
      console.error('Failed to change password', e);
    }
    this.changingPassword = false;
  }
}
