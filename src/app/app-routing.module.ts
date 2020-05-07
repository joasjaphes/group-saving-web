import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {StartComponent} from './registration/start/start.component';
import {LanguageSelectionComponent} from './registration/language-selection/language-selection.component';
import {PhoneNumberComponent} from './registration/phone-number/phone-number.component';
import {RegistrationComponent} from './registration/registration.component';


const routes: Routes = [
  {
    path: '',
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
        path: 'language-selection',
        component: LanguageSelectionComponent,
        data: {
          title: 'Select Language'
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
        path: 'phone-number',
        component: PhoneNumberComponent,
        data: {
          title: 'Phone Number'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
