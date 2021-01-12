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

@NgModule({
  declarations: [
    MatSelectSearchComponent,
    SharedLayoutComponent,
    TopBannerComponent,
    ViewHelpComponent,
    SearchPipe,
    FirstUpperCasePipe,
    ToUpperPipe,
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
    SearchPipe,
    FirstUpperCasePipe,
    ToUpperPipe,
  ]
})
export class SharedModule { }
