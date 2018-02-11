import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  odometerMiles: number;
  gasFilled: number;
  pricePaid: number;
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
    this.odometerMiles = null;
    this.gasFilled = null;
    this.pricePaid = null;
  }
}
