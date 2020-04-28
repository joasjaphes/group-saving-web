import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [],
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
    RouterModule
  ]
})
export class SharedModule { }
