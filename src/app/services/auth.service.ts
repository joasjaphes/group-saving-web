import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';
// import fb from 'firebase/app'
import User = firebase.User;
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  constructor(
    private afAuth: AngularFireAuth,
    private localStorageService: LocalStorageService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('group-saving-user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('group-saving-user', null);
      }
    });
  }

  async login(email: string, password: string) {
    localStorage.removeItem('group-saving-user');
    localStorage.removeItem('group_savings_active_group');
    localStorage.removeItem('group_savings_current_member');
    const result = await this.afAuth.signInWithEmailAndPassword(
      email,
      password
    );
  }

  async logout() {
    const result = await this.afAuth.signOut();
    localStorage.removeItem('group-saving-user');
    localStorage.removeItem('group_savings_active_group');
    localStorage.removeItem('group_savings_current_member');
    this.localStorageService.clearEverything();
  }

  getLoginUser(): Observable<User> {
    const userData = localStorage.getItem('group-saving-user');
    return JSON.parse(userData)
      ? of(JSON.parse(userData))
      : this.afAuth.authState;
  }

  async changePassword(currentPassword:string, newPassword: string) {
    try {
      const user = await this.afAuth.currentUser;
      const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      await user.reauthenticateWithCredential(cred);
      await user.updatePassword(newPassword);
    } catch (e) {
      console.error('Failed to change password', e);
      throw e
    }
  }
}
