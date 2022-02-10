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
import {SummaryComponent} from './modules/summary/summary.component';
import {MeetingComponent} from './modules/meeting/meeting.component';
import {MyAccountComponent} from './modules/my-account/my-account.component';
import {MembersComponent} from './modules/members/members.component';
import {SingleMemberComponent} from './modules/members/single-member/single-member.component';
import {ExpensesComponent} from './modules/summary/expenses/expenses.component';
import {PreviousDataComponent} from './modules/settings/previous-data/previous-data.component';
import {LoansComponent} from './modules/summary/loans/loans.component';
import {ContributionsComponent} from './modules/summary/contributions/contributions.component';
import {FinesComponent} from './modules/summary/fines/fines.component';
import {AdjustmentsComponent} from './modules/summary/adjustments/adjustments.component';
import {CashTransfersComponent} from './modules/summary/cash-transfers/cash-transfers.component';
import {LoanTypesComponent} from './modules/settings/loan-types/loan-types.component';
import {ContributionTypesComponent} from './modules/settings/contribution-types/contribution-types.component';
import {FineTypesComponent} from './modules/settings/fine-types/fine-types.component';
import {LoanQueueComponent} from './modules/summary/loan-queue/loan-queue.component';
import {ExportDataComponent} from './modules/summary/export-data/export-data.component';
import {DeleteContributionsComponent} from './modules/settings/delete-contributions/delete-contributions.component';
import {DeleteLoansComponent} from './modules/settings/delete-loans/delete-loans.component';
import {DeleteFinesComponent} from './modules/settings/delete-fines/delete-fines.component';
import {ContributionTypeBalanceEffects} from './store/contribution-type-balance/contribution-type-balance.effects';
import {HisaPeriodComponent} from './modules/settings/hisa-period/hisa-period.component';
import {OneTimePaymentSummaryComponent} from './modules/summary/one-time-payment-summary/one-time-payment-summary.component';


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
        path: 'summary',
        component: SummaryComponent,
        data: { title: 'Group Summary' }
      },
      {
        path: 'summary/expenses',
        component: ExpensesComponent,
        data: { title: 'Expenses' }
      },
      {
        path: 'summary/loans',
        component: LoansComponent,
        data: { title: 'Loans' }
      },
      {
        path: 'summary/contributions',
        component: ContributionsComponent,
        data: { title: 'Contribution' }
      },
      {
        path: 'summary/one-time-payment',
        component: OneTimePaymentSummaryComponent,
        data: { title: 'One Time Payment' }
      },
      {
        path: 'summary/fines',
        component: FinesComponent,
        data: { title: 'Fines' }
      },
      {
        path: 'summary/adjustments',
        component: AdjustmentsComponent,
        data: { title: 'Adjustments' }
      },
      {
        path: 'summary/cash-transfers',
        component: CashTransfersComponent,
        data: { title: 'Cash Transfers' }
      },
      {
        path: 'summary/loan-queue',
        component: LoanQueueComponent,
        data: { title: 'Loan Queue' }
      },
      {
        path: 'summary/export',
        component: ExportDataComponent,
        data: { title: 'Data Export' }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: { title: 'Settings' }
      },
      {
        path: 'settings/loan-types',
        component: LoanTypesComponent,
        data: { title: 'Loan Types' }
      },
      {
        path: 'settings/contribution-types',
        component: ContributionTypesComponent,
        data: { title: 'Contribution Types' }
      },
      {
        path: 'settings/fine-types',
        component: FineTypesComponent,
        data: { title: 'Fine Types' }
      },
      {
        path: 'settings/add-previous-data',
        component: PreviousDataComponent,
        data: { title: 'Previous Data' }
      },
      {
        path: 'settings/delete-contributions',
        component: DeleteContributionsComponent,
        data: { title: 'Delete Contributions' }
      },
      {
        path: 'settings/delete-fines',
        component: DeleteFinesComponent,
        data: { title: 'Delete Fines' }
      },
      {
        path: 'settings/delete-loans',
        component: DeleteLoansComponent,
        data: { title: 'Delete Loans' }
      },
      {
        path: 'settings/contribution-periods',
        component: HisaPeriodComponent,
        data: { title: 'Contribution Period' }
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
