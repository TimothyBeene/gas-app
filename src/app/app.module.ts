import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { GasDataService } from './gas-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatAutocompleteModule
} from '@angular/material';
const MatModules = [
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatAutocompleteModule
];

import { AppComponent } from './app.component';
import { AuthLandingComponent } from './auth-landing/auth-landing.component';

import { NgGapiClientConfig, GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { SheetsService } from './sheets.service';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.googleClientId,
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/analytics',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/spreadsheets.readonly'
  ].join(' '),
  ux_mode: 'popup'
};

const appRoutes: Routes = [
  { path: 'google-auth-callback',  component: AuthLandingComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthLandingComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...MatModules,
    RouterModule.forRoot(appRoutes),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  providers: [
    GasDataService,
    UserService,
    SheetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
