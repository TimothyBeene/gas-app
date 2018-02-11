import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...MatModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
