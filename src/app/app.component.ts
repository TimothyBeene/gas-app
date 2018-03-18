import { SheetsService } from './sheets.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { GasDataService } from './gas-data.service';
import { Component, OnInit } from '@angular/core';
import * as ClientOAuth2 from 'client-oauth2';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
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

  constructor(
    private gasDataService: GasDataService,
    private router: Router,
    private gapiService: GoogleApiService,
    private userService: UserService,
    private sheetsService: SheetsService
  ) {}

  ngOnInit() { }
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
  test() {
    this.sheetsService.pushGasRecord({value: 'one'});
    this.sheetsService.getDataFromSheet('A1:C99')
        .map(res => res['valueRanges'][0]['values'])
        .subscribe(res => console.log(res));
  }
  onAuthGoogle() {
    this.userService.signIn();
  }
}

