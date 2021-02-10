import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatSelectSearchComponent} from './components/mat-select-search/mat-select-search.component';
import {SearchPipe} from './pipes/search.pipe';
import {SharedLayoutComponent} from './components/shared-layout/shared-layout.component';
import {TopBannerComponent} from './components/topbanner/top-banner.component';
import {ViewHelpComponent} from './components/view-help/view-help.component';
import { FirstUpperCasePipe } from './pipes/first-upper-case.pipe';
import {ToUpperPipe} from './pipes/to-upper.pipe';
import { CircularProgressComponent } from './components/circular-progress/circular-progress.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import {SaveAreaComponent} from './components/save-area/save-area.component';
import {LoaderComponent} from './components/loader/loader.component';
import { EmptySummaryComponent } from './components/empty-summary/empty-summary.component';
import {GroupProgressComponent} from './components/group-progress/group-progress.component';
import {GroupProgressDialogComponent} from './components/group-progress/group-progress-dialog/group-progress-dialog.component';
import {GroupStartingInfoComponent} from './components/group-progress/group-starting-info/group-starting-info.component';
import {StartingContributionTypeComponent} from './components/group-progress/starting-contribution-type/starting-contribution-type.component';
import {StartingLoanTypeComponent} from './components/group-progress/starting-loan-type/starting-loan-type.component';
import {StartingMeetingRulesComponent} from './components/group-progress/starting-meeting-rules/starting-meeting-rules.component';
import {StartingMembersComponent} from './components/group-progress/starting-members/starting-members.component';
import {StartingLeadershipComponent} from './components/group-progress/starting-leadership/starting-leadership.component';
import {StartingBalancesComponent} from './components/group-progress/starting-balances/starting-balances.component';
import { HalfProgressComponent } from './components/half-progress/half-progress.component';

@NgModule({
  declarations: [
    MatSelectSearchComponent,
    SharedLayoutComponent,
    TopBannerComponent,
    ViewHelpComponent,
    SearchPipe,
    FirstUpperCasePipe,
    ToUpperPipe,
    CircularProgressComponent,
    MenuItemsComponent,
    SaveAreaComponent,
    LoaderComponent,
    EmptySummaryComponent,
    GroupProgressComponent,
    GroupProgressDialogComponent,
    GroupStartingInfoComponent,
    StartingContributionTypeComponent,
    StartingLoanTypeComponent,
    StartingMeetingRulesComponent,
    StartingMembersComponent,
    StartingLeadershipComponent,
    StartingBalancesComponent,
    HalfProgressComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
    exports: [
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,

        MatSelectSearchComponent,
        SharedLayoutComponent,
        TopBannerComponent,
        ViewHelpComponent,
        CircularProgressComponent,
        MenuItemsComponent,
        SaveAreaComponent,
        LoaderComponent,
        EmptySummaryComponent,
        GroupProgressComponent,
        GroupProgressDialogComponent,
        GroupStartingInfoComponent,
        StartingContributionTypeComponent,
        StartingLoanTypeComponent,
        StartingMeetingRulesComponent,
        StartingMembersComponent,
        StartingLeadershipComponent,
        StartingBalancesComponent,

        SearchPipe,
        FirstUpperCasePipe,
        ToUpperPipe,
        HalfProgressComponent,
    ]
})
export class SharedModule { }
