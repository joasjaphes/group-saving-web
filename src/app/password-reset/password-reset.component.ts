import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  fadeIn,
  ROUTE_ANIMATIONS_ELEMENTS,
} from '../shared/animations/router-animation';
import { ApplicationState } from '../store';
import { selectProgressValue } from '../store/login-steps/login-steps.selectors';
import { Back, Go } from '../store/router/router.action';
import * as loginSelector from '../store/login-steps/login-steps.selectors';
import { FunctionsService } from '../services/functions.service';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  animations: [fadeIn],
})
export class PasswordResetComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  progressValue$: Observable<number>;
  title = 'Change Password';
  password: string;
  newPassword: string;
  confirmPassword: string;
  currentInput = 'currentPassword';
  loading = false;
  constructor(
    private store: Store<ApplicationState>,
    private functionsService: FunctionsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.progressValue$ = this.store.pipe(select(selectProgressValue));
  }

  get passwordMatch() {
    return this.confirmPassword === this.newPassword;
  }

  onBack() {
    if (this.currentInput === 'currentPassword') {
      this.store.dispatch(new Back());
    } else if (this.currentInput === 'newPassword') {
      this.currentInput = 'currentPassword';
    } else {
      this.currentInput = 'newPassword';
    }
  }

  async submit() {
    this.loading = true;
    try {
      const phoneNumber = await this.store
        .pipe(
          select(loginSelector.selectPhoneNumber),
          first((i) => !!i)
        )
        .toPromise();
      const email = await this.store
        .pipe(
          select(loginSelector.selectEmail),
          first((i) => !!i)
        )
        .toPromise();
      const payload = {
        phoneNumber,
        password: this.newPassword,
        should_reset_password: false,
      };
      await this.authService.login(email, this.password);
      await this.functionsService.saveData('updatePassword', payload);
      this.store.dispatch(new Go({path:['']}))
    } catch (e) {
      console.error(e);
    }
    this.loading = false;
  }
}
