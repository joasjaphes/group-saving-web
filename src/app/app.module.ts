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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
