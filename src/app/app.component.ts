import { SheetsService } from './sheets.service';
import { UserService } from './auth/user.service';
import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import * as ClientOAuth2 from 'client-oauth2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isSideNavOpen: boolean;

  constructor(
    private router: Router,
    public userService: UserService,
    public sheetsService: SheetsService
  ) {}

  ngOnInit() {
    this.isSideNavOpen = false;
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe( _ => this.closeSideNav());
  }

  onAuthGoogle() {
    this.userService.signIn();
  }
  logout() {
    this.userService.logout();
  }
  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }
  closeSideNav() {
    this.isSideNavOpen = false;
  }
}
