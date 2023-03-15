import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApplicationState } from '../store';
import {
  selectMemberName,
  selectPhoneNumber,
} from '../store/login-steps/login-steps.selectors';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  memberName$: Observable<string>;
  phoneNumber: string;
  constructor(private store: Store<ApplicationState>) {}

  ngOnInit(): void {
    this.memberName$ = this.store.pipe(
      select(selectMemberName),
      first((i) => !!i)
    );
    this.store
      .pipe(
        select(selectPhoneNumber),
        first((i) => !!i)
      )
      .subscribe((phone) => {
        this.phoneNumber = phone;
      })
      .unsubscribe();
  }

  async sendMessage() {
    
  }
}
