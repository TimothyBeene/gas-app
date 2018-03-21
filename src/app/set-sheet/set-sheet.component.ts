import { SheetsService } from './../sheets.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-sheet',
  templateUrl: './set-sheet.component.html',
  styleUrls: ['./set-sheet.component.css']
})
export class SetSheetComponent implements OnInit {

  constructor(
    private sheetsService: SheetsService
  ) { }

  ngOnInit() {
  }

  setSheetId(rawSheetId: string) {
    // tslint:disable-next-line:max-line-length
    const isUrlRegex = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})';
    let sheetId;
    if (rawSheetId.match(isUrlRegex)) {
      sheetId = /spreadsheets\/d\/([a-zA-Z0-9-_]+)/.exec(rawSheetId)[1];
    } else {
      sheetId = rawSheetId;
    }
    this.sheetsService.setSheetId(sheetId);
  }

}
