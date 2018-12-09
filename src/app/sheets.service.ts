import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UserService } from './auth/user.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SheetsService {

  private sheetData: any;
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
      this.createSheet().subscribe(this.formatSheet);
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
      values: [[data.odometerMiles, data.gasFilled, data.pricePaid, new Date()]]
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
                  {userEnteredValue: {stringValue: 'Odometer Miles'}},
                  {userEnteredValue: {stringValue: 'Gas Filled'}},
                  {userEnteredValue: {stringValue: 'Price Paid'}},
                  {userEnteredValue: {stringValue: 'Date'}}
                ]
              }
            }
          }
        ]
      }
    )
    .map(this.extractData.bind(this))
    .map(this.setSheetId.bind(this));
  }

  formatSheet(): Observable<any> {
    return this.http.post(
      `${environment.googleSheetsBaseUrl}/${this.sheetId}:batchUpdate`,
      {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: this.sheetData.sheets[0].properties.sheetId,
                // startRowIndex: 4,
                // endRowIndex: 5,
                startColumnIndex: 4,
                endColumnIndex: 5
              },
              cell: {
                userEnteredFormat: {
                  numberFormat: {
                    type: 'DATE',
                    pattern: 'hh:mm:ss am/pm, ddd mmm dd yyyy'
                  }
                }
              },
              fields: 'userEnteredFormat.numberFormat'
            }
          }
        ]
      }
    );
  }

  setSheetId(sheetId) {
    this.internalSheetId$.next(sheetId);
    localStorage.setItem('sheetId', sheetId);
    return sheetId;
  }

  extractData(sheetData: any) {
    this.sheetData = sheetData;
    return sheetData.spreadsheetId;
  }

}
