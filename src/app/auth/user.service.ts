import { Injectable } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

type GoogleUser = any;

@Injectable()
export class UserService {
  public static SESSION_STORAGE_KEY: string = 'accessToken';
  private user: GoogleUser;

  isLoggedIn$: Subject<boolean> = new ReplaySubject();

  constructor(
    private googleAuth: GoogleAuthService
  ) {
    this.isLoggedIn$.next(!!this.getToken());
  }

  public getToken(): string {
    let token: string = sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
    if (!token) {
      this.isLoggedIn$.next(true);
      this.signIn();
      // throw new Error('no token set , authentication required');
    }
    return sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
  }

  public signIn(): void {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => this.signInSuccessHandler(res));
      });
  }
  public logout() {
    sessionStorage.removeItem(UserService.SESSION_STORAGE_KEY);
    this.user = null;
    this.isLoggedIn$.next(false);
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.user = res;
    sessionStorage.setItem(
      UserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
    this.isLoggedIn$.next(true);
  }
}
