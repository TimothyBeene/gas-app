import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UserService } from './auth/user.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SheetsService {

  private sheetId: string;
  private internalSheetId$: BehaviorSubject<string>;
  public sheetId$: Observable<string>;
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.internalSheetId$ = <BehaviorSubject<string>> new BehaviorSubject('');
    this.sheetId$ = this.internalSheetId$.asObservable();
    this.sheetId$.subscribe( id => this.sheetId = id);

    if (localStorage.getItem('sheetId')) {
      this.internalSheetId$.next(localStorage.getItem('sheetId'));
    } else {
      this.createSheet().subscribe();
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
                  // {userEnteredValue: {stringValue: 'Date'}},
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
    .map(this.setSheetId.bind(this));
  }

  setSheetId(sheetId) {
    this.internalSheetId$.next(sheetId);
    localStorage.setItem('sheetId', sheetId);
    return sheetId;
  }

}
