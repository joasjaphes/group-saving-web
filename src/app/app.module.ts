import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {effects} from './store/app.effects';
import {FullRouterStateSerializer, RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from './store/router/router.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { StartComponent } from './registration/start/start.component';
import { LanguageSelectionComponent } from './registration/language-selection/language-selection.component';
import { RegistrationTemplateComponent } from './registration/registration-template/registration-template.component';
import { PhoneNumberComponent } from './registration/phone-number/phone-number.component';
import { RegistrationComponent } from './registration/registration.component';
import { CountrySelectionComponent } from './registration/country-selection/country-selection.component';
import { EnterPasswordComponent } from './registration/enter-password/enter-password.component';
import { MemberGroupsComponent } from './registration/member-groups/member-groups.component';
import { MemberNameComponent } from './registration/member-name/member-name.component';
import { GroupNameComponent } from './registration/group-name/group-name.component';
import { SetPasswordComponent } from './registration/set-password/set-password.component';
import { ConfirmPasswordComponent } from './registration/confirm-password/confirm-password.component';
import { NumberOfMembersComponent } from './registration/number-of-members/number-of-members.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { CreatingGroupComponent } from './registration/creating-group/creating-group.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { MembersComponent } from './modules/members/members.component';
import { MeetingComponent } from './modules/meeting/meeting.component';
import { MyAccountComponent } from './modules/my-account/my-account.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { SummaryComponent } from './modules/summary/summary.component';
import { ProfileComponent } from './modules/my-account/profile/profile.component';
import { ChangePasswordComponent } from './modules/my-account/change-password/change-password.component';
import { AddContributionComponent } from './modules/members/add-contribution/add-contribution.component';
import { AssignLoanComponent } from './modules/members/assign-loan/assign-loan.component';
import { SingleMemberComponent } from './modules/members/single-member/single-member.component';
import { ExpensesComponent } from './modules/summary/expenses/expenses.component';
import { AddExpenseComponent } from './modules/summary/expenses/add-expense/add-expense.component';
import { AddMemberComponent } from './modules/members/add-member/add-member.component';
import { PreviousDataComponent } from './modules/settings/previous-data/previous-data.component';
import { ContributionByMemberComponent } from './modules/settings/previous-data/contribution-by-member/contribution-by-member.component';
import { ContributionByPeriodComponent } from './modules/settings/previous-data/contribution-by-period/contribution-by-period.component';
import { LoanByMemberComponent } from './modules/settings/previous-data/loan-by-member/loan-by-member.component';
import { FinesByMemberComponent } from './modules/settings/previous-data/fines-by-member/fines-by-member.component';
import { LoansComponent } from './modules/summary/loans/loans.component';
import { ContributionsComponent } from './modules/summary/contributions/contributions.component';
import { FinesComponent } from './modules/summary/fines/fines.component';
import { AdjustmentsComponent } from './modules/summary/adjustments/adjustments.component';
import { CashTransfersComponent } from './modules/summary/cash-transfers/cash-transfers.component';
import { LoanTypesComponent } from './modules/settings/loan-types/loan-types.component';
import { FineTypesComponent } from './modules/settings/fine-types/fine-types.component';
import { ContributionTypesComponent } from './modules/settings/contribution-types/contribution-types.component';
import { LoanQueueComponent } from './modules/summary/loan-queue/loan-queue.component';
import { AddLoanQueueComponent } from './modules/summary/loan-queue/add-loan-queue/add-loan-queue.component';
import { SetMeetingComponent } from './modules/meeting/set-meeting/set-meeting.component';
import { CompleteMeetingComponent } from './modules/meeting/complete-meeting/complete-meeting.component';
import { CancelMeetingComponent } from './modules/meeting/cancel-meeting/cancel-meeting.component';
import { EmptyMeetingComponent } from './modules/meeting/empty-meeting/empty-meeting.component';
import { NextMeetingComponent } from './modules/meeting/next-meeting/next-meeting.component';
import { ListContributionsComponent } from './modules/summary/contributions/list-contributions/list-contributions.component';
import { SingleLoanComponent } from './modules/summary/loans/single-loan/single-loan.component';
import { ViewMeetingComponent } from './modules/meeting/view-meeting/view-meeting.component';
import { DeleteMeetingComponent } from './modules/meeting/delete-meeting/delete-meeting.component';
import { CollectionSummaryComponent } from './modules/dashboard/collection-summary/collection-summary.component';
import { CollectionCardComponent } from './modules/dashboard/collection-summary/collection-card/collection-card.component';
import { LoanSummaryComponent } from './modules/dashboard/loan-summary/loan-summary.component';
import { OtherSummaryComponent } from './modules/dashboard/other-summary/other-summary.component';
import { ListFinesComponent } from './modules/summary/fines/list-fines/list-fines.component';
import { HisaPeriodComponent } from './modules/settings/hisa-period/hisa-period.component';
import { ViewMemberComponent } from './modules/members/view-member/view-member.component';
import { RemoveFromQueueComponent } from './modules/summary/loan-queue/remove-from-queue/remove-from-queue.component';
import { DeleteExpenseComponent } from './modules/summary/expenses/delete-expense/delete-expense.component';
import { UpdateMemberBasicsComponent } from './modules/members/update-member-basics/update-member-basics.component';
import { UpdateMemberPhoneComponent } from './modules/members/update-member-phone/update-member-phone.component';
import { UpdateMemberEmailComponent } from './modules/members/update-member-email/update-member-email.component';
import { ExportDataComponent } from './modules/summary/export-data/export-data.component';
import { LoanItemComponent } from './modules/summary/loans/loan-item/loan-item.component';
import { ContributionItemComponent } from './modules/summary/contributions/contribution-item/contribution-item.component';
import { FineItemComponent } from './modules/summary/fines/fine-item/fine-item.component';
import { SummaryModelComponent } from './modules/dashboard/summary-model/summary-model.component';
import { MembersPermissionComponent } from './modules/settings/members-permission/members-permission.component';
import { ContributionSummaryComponent } from './modules/dashboard/contribution-summary/contribution-summary.component';
import { FineSummaryComponent } from './modules/dashboard/fine-summary/fine-summary.component';
import { ExpenseSummaryComponent } from './modules/dashboard/expense-summary/expense-summary.component';
import { LeadershipSummaryComponent } from './modules/dashboard/leadership-summary/leadership-summary.component';
import { UpcomingContributionSummaryComponent } from './modules/dashboard/upcomming-contribution-summary/upcoming-contribution-summary.component';
import { LoanQueueSummaryComponent } from './modules/dashboard/loan-queue-summary/loan-queue-summary.component';
import { MonthExportComponent } from './modules/summary/export-data/month-export/month-export.component';
import { LoanExportComponent } from './modules/summary/export-data/loan-export/loan-export.component';
import { ContributionExportComponent } from './modules/summary/export-data/contribution-export/contribution-export.component';
import {CommonModule} from '@angular/common';
import { ImportContributionComponent } from './modules/settings/previous-data/import-contribution/import-contribution.component';
import { DeleteContributionsComponent } from './modules/settings/delete-contributions/delete-contributions.component';
import { DeleteFinesComponent } from './modules/settings/delete-fines/delete-fines.component';
import { DeleteLoansComponent } from './modules/settings/delete-loans/delete-loans.component';
import { AddOneTimeContributionComponent } from './modules/members/add-one-time-contribution/add-one-time-contribution.component';
import { AddExpectedFineComponent } from './modules/summary/fines/add-expected-fine/add-expected-fine.component';
import { OneTimePaymentSummaryComponent } from './modules/summary/one-time-payment-summary/one-time-payment-summary.component';
import { ListOneTimePaymentComponent } from './modules/summary/one-time-payment-summary/list-one-time-payment/list-one-time-payment.component';
import { OneTimePaymentItemComponent } from './modules/summary/one-time-payment-summary/one-time-payment-item/one-time-payment-item.component';
import { ListExpectedFinesComponent } from './modules/summary/fines/list-expected-fines/list-expected-fines.component';
import { ImportLoansComponent } from './modules/settings/previous-data/import-loans/import-loans.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SingleLoanQueueItemComponent } from './modules/summary/loan-queue/single-loan-queue-item/single-loan-queue-item.component';
import { ExpectedCollectionComponent } from './modules/summary/expected-collection/expected-collection.component';
import { ExpectedCollectionItemComponent } from './modules/summary/expected-collection/expected-collection-item/expected-collection-item.component';
import { ImportErmsDataComponent } from './registration/import-erms-data/import-erms-data.component';
import { AddAnotherAccountComponent } from './modules/members/add-another-account/add-another-account.component';
import { LoanRequestSettingComponent } from './modules/settings/loan-request-setting/loan-request-setting.component';
import { SwitchGroupsComponent } from './menu/switch-groups/switch-groups.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCZlASesgqHoCE8YjsXhsJ7IO4-q3OWqlI',
  authDomain: 'group-saving.firebaseapp.com',
  databaseURL: 'https://group-saving.firebaseio.com',
  projectId: 'group-saving',
  storageBucket: 'group-saving.appspot.com',
  messagingSenderId: '444964071176',
  appId: '1:444964071176:web:732f9c6071c5a461b5eebd',
  measurementId: 'G-JC2DKTVF1V'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StartComponent,
    LanguageSelectionComponent,
    RegistrationTemplateComponent,
    PhoneNumberComponent,
    RegistrationComponent,
    CountrySelectionComponent,
    EnterPasswordComponent,
    MemberGroupsComponent,
    MemberNameComponent,
    GroupNameComponent,
    SetPasswordComponent,
    ConfirmPasswordComponent,
    NumberOfMembersComponent,
    CreatingGroupComponent,
    DashboardComponent,
    MenuComponent,
    MembersComponent,
    MeetingComponent,
    MyAccountComponent,
    SettingsComponent,
    SummaryComponent,
    ProfileComponent,
    ChangePasswordComponent,
    AddContributionComponent,
    AssignLoanComponent,
    SingleMemberComponent,
    ExpensesComponent,
    AddExpenseComponent,
    AddMemberComponent,
    PreviousDataComponent,
    ContributionByMemberComponent,
    ContributionByPeriodComponent,
    LoanByMemberComponent,
    FinesByMemberComponent,
    LoansComponent,
    ContributionsComponent,
    FinesComponent,
    AdjustmentsComponent,
    CashTransfersComponent,
    LoanTypesComponent,
    FineTypesComponent,
    ContributionTypesComponent,
    LoanQueueComponent,
    AddLoanQueueComponent,
    SetMeetingComponent,
    CompleteMeetingComponent,
    CancelMeetingComponent,
    EmptyMeetingComponent,
    NextMeetingComponent,
    ListContributionsComponent,
    SingleLoanComponent,
    ViewMeetingComponent,
    DeleteMeetingComponent,
    CollectionSummaryComponent,
    CollectionCardComponent,
    LoanSummaryComponent,
    OtherSummaryComponent,
    ListFinesComponent,
    HisaPeriodComponent,
    ViewMemberComponent,
    RemoveFromQueueComponent,
    DeleteExpenseComponent,
    UpdateMemberBasicsComponent,
    UpdateMemberPhoneComponent,
    UpdateMemberEmailComponent,
    ExportDataComponent,
    LoanItemComponent,
    ContributionItemComponent,
    FineItemComponent,
    SummaryModelComponent,
    MembersPermissionComponent,
    ContributionSummaryComponent,
    FineSummaryComponent,
    ExpenseSummaryComponent,
    LeadershipSummaryComponent,
    UpcomingContributionSummaryComponent,
    LoanQueueSummaryComponent,
    MonthExportComponent,
    LoanExportComponent,
    ContributionExportComponent,
    ImportContributionComponent,
    DeleteContributionsComponent,
    DeleteFinesComponent,
    DeleteLoansComponent,
    AddOneTimeContributionComponent,
    AddExpectedFineComponent,
    OneTimePaymentSummaryComponent,
    ListOneTimePaymentComponent,
    OneTimePaymentItemComponent,
    ListExpectedFinesComponent,
    ImportLoansComponent,
    PrivacyComponent,
    SingleLoanQueueItemComponent,
    ExpectedCollectionComponent,
    ExpectedCollectionItemComponent,
    ImportErmsDataComponent,
    AddAnotherAccountComponent,
    LoanRequestSettingComponent,
    SwitchGroupsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(
      {serializer: FullRouterStateSerializer}
    ),
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
