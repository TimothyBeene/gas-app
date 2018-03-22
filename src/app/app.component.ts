import { SheetsService } from './sheets.service';
import { UserService } from './auth/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as ClientOAuth2 from 'client-oauth2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  odometerMiles: number;
  gasFilled: number;
  pricePaid: number;
  gasData;
  sheetId: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private sheetsService: SheetsService
  ) {}

  ngOnInit() {
    this.sheetId = this.sheetsService.sheetId;
  }

  onSubmit() {
    console.log('submit');
    this.sheetsService.pushGasRecord({
      odometerMiles: this.odometerMiles,
      gasFilled: this.gasFilled,
      pricePaid: this.pricePaid
    }).subscribe( () => {
      this.odometerMiles = null;
      this.gasFilled = null;
      this.pricePaid = null;
    });

  }
  onAuthGoogle() {
    this.userService.signIn();
  }
}
