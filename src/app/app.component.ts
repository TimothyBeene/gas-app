import { SheetsService } from './sheets.service';
import { UserService } from './auth/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as ClientOAuth2 from 'client-oauth2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
  }

  onAuthGoogle() {
    this.userService.signIn();
  }
}
