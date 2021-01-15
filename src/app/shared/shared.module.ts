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
    SearchPipe,
    FirstUpperCasePipe,
    ToUpperPipe,
  ]
})
export class SharedModule { }
