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
import {DefaultRouterStateSerializer, RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
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
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { CreatingGroupComponent } from './registration/creating-group/creating-group.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { MembersComponent } from './modules/members/members.component';
import { MeetingComponent } from './modules/meeting/meeting.component';
import { MyAccountComponent } from './modules/my-account/my-account.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { MoreInfomationComponent } from './modules/more-infomation/more-infomation.component';
import { ProfileComponent } from './modules/my-account/profile/profile.component';
import { ChangePasswordComponent } from './modules/my-account/change-password/change-password.component';
import { GroupProgressComponent } from './modules/dashboard/group-progress/group-progress.component';
import { GroupProgressDialogComponent } from './modules/dashboard/group-progress/group-progress-dialog/group-progress-dialog.component';
import { GroupStartingInfoComponent } from './modules/dashboard/group-progress/group-starting-info/group-starting-info.component';
import { StartingContributionTypeComponent } from './modules/dashboard/group-progress/starting-contribution-type/starting-contribution-type.component';
import { StartingLoanTypeComponent } from './modules/dashboard/group-progress/starting-loan-type/starting-loan-type.component';
import { StartingMeetingRulesComponent } from './modules/dashboard/group-progress/starting-meeting-rules/starting-meeting-rules.component';
import { StartingMembersComponent } from './modules/dashboard/group-progress/starting-members/starting-members.component';
import { StartingLeadershipComponent } from './modules/dashboard/group-progress/starting-leadership/starting-leadership.component';

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
    MoreInfomationComponent,
    ProfileComponent,
    ChangePasswordComponent,
    GroupProgressComponent,
    GroupProgressDialogComponent,
    GroupStartingInfoComponent,
    StartingContributionTypeComponent,
    StartingLoanTypeComponent,
    StartingMeetingRulesComponent,
    StartingMembersComponent,
    StartingLeadershipComponent
  ],
  imports: [
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
      {serializer: DefaultRouterStateSerializer}
    ),
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
