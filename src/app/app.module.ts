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
  MatAutocompleteModule,
  MatTabsModule,
  MatCardModule
} from '@angular/material';
const MatModules = [
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatCardModule
];

import { AppComponent } from './app.component';
import { AuthLandingComponent } from './auth-landing/auth-landing.component';

import { NgGapiClientConfig, GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';
import { UserService } from './auth/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SheetsService } from './sheets.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { SetSheetComponent } from './set-sheet/set-sheet.component';
import { FuelDataComponent } from './fuel-data/fuel-data.component';

const appRoutes: Routes = [
  { path: 'fuel-data',  component: FuelDataComponent },
  { path: 'google-auth-callback',  component: AuthLandingComponent },
  { path: 'set-sheet',  component: SetSheetComponent },
  { path: '',  redirectTo: '/fuel-data', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthLandingComponent,
    SetSheetComponent,
    FuelDataComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...MatModules,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    environment.production ? ServiceWorkerModule.register('/gas-app/ngsw-worker.js') : [],
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: environment.gapiClientConfig
    })
  ],
  providers: [
    GasDataService,
    UserService,
    SheetsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
