import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UserService } from './auth/user.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class SheetsService {

  sheetId: string;
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    if (localStorage.getItem('sheetId')) {
      this.sheetId = localStorage.getItem('sheetId' );
    } else {
      this.createSheet().subscribe(res => {
        this.setSheetId(res);
      });
    }
  }

  saveDataToSheet(data: {range: string, majorDimension: string, values: [number[]]}) {
    return this.http.post(
      `${environment.googleSheetsBaseUrl}/${this.sheetId}/values/${data.range}:append`,
      data,
      {
        params: { valueInputOption: 'USER_ENTERED' }
      }
    );
  }

  getDataFromSheet(range: string) {
    return this.http.get(
      `${environment.googleSheetsBaseUrl}/${this.sheetId}/values:batchGet`,
      {
        params: {
          ranges: range,
          majorDimension: 'ROWS'
        }
      }
    );
  }

  pushGasRecord(data: any) {
    // add data row to local storage
    let gasData = JSON.parse(localStorage.getItem('gasData') ? localStorage.getItem('gasData') : '[]');

    return this.saveDataToSheet({
      range: 'A1:C1',
      majorDimension: 'ROWS',
      values: [[data.odometerMiles, data.gasFilled, data.pricePaid]]
    }).map( res => {
      gasData.push(data);
      return res;
    });
  }


  createSheet(): Observable<string> {
    const sheetTitle = 'Fuel Tracker - Fill Data';
    return this.http.post(
      environment.googleSheetsBaseUrl,
      {
        properties: {
          title: sheetTitle
        },
        sheets: [
          {
            properties: {
              gridProperties: {
                frozenRowCount: 1
              }
            },
            data: {
              rowData: {
                values: [
                  {userEnteredValue: {stringValue: 'Date'}},
                  {userEnteredValue: {stringValue: 'Odometer Miles'}},
                  {userEnteredValue: {stringValue: 'Gas Filled'}},
                  {userEnteredValue: {stringValue: 'Price Paid'}}
                ]
              }
            }
          }
        ]
      }
    )
    .map( res => res['spreadsheetId'])
    .map( id => {
      this.sheetId = id;
      return id;
    });
  }

  setSheetId(sheetId) {
    this.sheetId = sheetId;
    localStorage.setItem('sheetId', this.sheetId);
  }

}
