import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {StartComponent} from './registration/start/start.component';
import {RegistrationComponent} from './registration/registration.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {MenuComponent} from './menu/menu.component';


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
        data: {
          title: 'Home'
        }
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
