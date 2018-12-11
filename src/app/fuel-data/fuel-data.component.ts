import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { SheetsService } from '../sheets.service';

@Component({
  selector: 'app-fuel-data',
  templateUrl: './fuel-data.component.html',
  styleUrls: ['./fuel-data.component.css']
})
export class FuelDataComponent implements OnInit {

  gasData = {
    odometerMiles: null,
    gasFilled: null,
    pricePaid: null
  };

  constructor(
    private userService: UserService,
    public sheetsService: SheetsService
  ) { }

  ngOnInit() {
    this.sheetsService.sheetId$.subscribe( id => {
      console.log(id);
    });
  }

  onSubmit() {
    this.sheetsService.pushGasRecord(
      this.gasData
    ).subscribe( () => {
      this.gasData = {
        odometerMiles: null,
        gasFilled: null,
        pricePaid: null
      };
    });

  }

  checkPattern(input, model) {
    console.log('checkPattern', input.value, model);
    let tempValue = input.value;
    tempValue = tempValue.replace(/\./g, '');
    if ( tempValue.length > 2 ) {
      const parsed = /(\d*)(\d\d)$/.exec(tempValue);
      tempValue = parsed[1] + '.' + parsed[2];
    }
    input.value = tempValue;
  }

  noPeriods(event: KeyboardEvent) {
    if (/^[a-z]|[A-Z]|\.|\+|-|\*|\\|=|'|"|`|~| |_|,|<|>|\?|-$/.test(event.key)) {
      console.log('noPeriods', event.key);
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }

  blurThis(element) {
    return false;
  }

}
