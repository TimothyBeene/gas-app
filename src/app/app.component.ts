import { UserService } from './user.service';
import { Router } from '@angular/router';
import { GasDataService } from './gas-data.service';
import { Component, OnInit } from '@angular/core';
import * as ClientOAuth2 from 'client-oauth2';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ) {}

  ngOnInit() {
    let googleAuth = new ClientOAuth2({
      clientId: '594820868776-bgt38hgh612g6sis74q2cg9d801dtd6h.apps.googleusercontent.com',
      authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
      redirectUri: 'http://10.7.20.12:4200/',
      scopes: ['notifications', 'gist']
    });
    this.gapiService.onLoad().subscribe(()=> {
      // Here we can use gapi
      
   });
  }
  onSubmit() {
    console.log('submit');
    // add data row to local storage
    let gasData = JSON.parse(localStorage.getItem('gasData') ? localStorage.getItem('gasData') : '[]');
    gasData.push({
      'odometerMiles': this.odometerMiles,
      'gasFilled': this.gasFilled,
      'pricePaid': this.pricePaid
    });
    localStorage.setItem('gasData', JSON.stringify(gasData));
    this.http.post(
      'https://sheets.googleapis.com/v4/spreadsheets/1HpD_49Y2d2vRfMRmXk8JrNX2LtUfNCIArdZO9fKXHLI/values/A1:C1:append?valueInputOption=USER_ENTERED&access_token=' + this.userService.getToken(),
      {
        "range": 'A1:C1',
        "majorDimension": 'ROWS',
        "values": [[this.odometerMiles, this.gasFilled, this.pricePaid]],
      }
    ).subscribe((data) => console.log(data));
    this.gasData = gasData;
    this.odometerMiles = null;
    this.gasFilled = null;
    this.pricePaid = null;

  }
  getToken() {
    console.log(this.userService.getToken());
  }
  getSheet() {
    this.http.get(
      'https://sheets.googleapis.com/v4/spreadsheets/1HpD_49Y2d2vRfMRmXk8JrNX2LtUfNCIArdZO9fKXHLI/?access_token=' + this.userService.getToken()
    ).subscribe((data) => console.log(data));
  }
  onAuthGoogle() {
    this.userService.signIn();
    // navigate to googl url
    // window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth'
    // + '?redirect_uri=http://localhost:4200/google-auth-callback'
    // + '&prompt=consent'
    // + '&response_type=code'
    // + '&client_id=594820868776-bgt38hgh612g6sis74q2cg9d801dtd6h.apps.googleusercontent.com'
    // + '&scope=https://spreadsheets.google.com/feeds/'
    // + '&access_type=offline';
  }
}

