import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { fadeIn } from 'src/app/shared/animations/router-animation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [fadeIn],
})
export class ChangePasswordComponent implements OnInit {
  passWord: string;
  confirmPassword: string;
  currentPassword: string;
  loading = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async save() {
    this.loading = true;
    try {
      await this.authService.changePassword(
        this.currentPassword,
        this.passWord
      );
      await this.authService.logout();
    } catch (e) {
      console.error('Failed to change password', e);
    }
    this.loading = false;
  }
}
