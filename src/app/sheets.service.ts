import { HttpClient } from '@angular/common/http';
import { UserService } from './auth/user.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class SheetsService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

    // sheetId: string = '1HpD_49Y2d2vRfMRmXk8JrNX2LtUfNCIArdZO9fKXHLI';
    sheetId = environment.sheetId;

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
      localStorage.setItem('gasData', JSON.stringify(gasData));
      return res;
    });
  }

}
