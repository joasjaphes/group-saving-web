import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {StartComponent} from './registration/start/start.component';
import {RegistrationComponent} from './registration/registration.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {MenuComponent} from './menu/menu.component';
import {ProfileComponent} from './modules/my-account/profile/profile.component';
import {ChangePasswordComponent} from './modules/my-account/change-password/change-password.component';
import {SettingsComponent} from './modules/settings/settings.component';
import {MoreInfomationComponent} from './modules/more-infomation/more-infomation.component';
import {MeetingComponent} from './modules/meeting/meeting.component';
import {MyAccountComponent} from './modules/my-account/my-account.component';
import {MembersComponent} from './modules/members/members.component';
import {SingleMemberComponent} from './modules/members/single-member/single-member.component';
import {ExpensesComponent} from './modules/expenses/expenses.component';


const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        data: {
          title: 'Home'
        }
      },
      {
        path: 'home',
        component: DashboardComponent,
        data: { title: 'Home' }
      },
      {
        path: 'members',
        component: MembersComponent,
        data: { title: 'Members' }
      },
      {
        path: 'members/:id',
        component: SingleMemberComponent,
        data: { title: 'Member Details' }
      },
      {
        path: 'my-account',
        component: MyAccountComponent,
        data: { title: 'My Account' }
      },
      {
        path: 'meeting',
        component: MeetingComponent,
        data: { title: 'Meeting' }
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
        data: { title: 'Expenses' }
      },
      {
        path: 'more-information',
        component: MoreInfomationComponent,
        data: { title: 'More Information' }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: { title: 'Settings' }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: { title: 'Change Password' }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'My Profile' }
      },
    ],
  },
  {
    path: 'welcome',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: StartComponent,
        data: {
          title: 'Welcome, Group Savings'
        }
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        data: {
          title: 'Registration'
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Phone Number'
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
