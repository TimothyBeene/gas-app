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

}
