import { Injectable } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

type GoogleUser = any;

@Injectable()
export class UserService {
  public static LOCAL_STORAGE_KEY: string = 'accessToken';
  private user: GoogleUser;

  isLoggedIn$: Subject<boolean> = new ReplaySubject();

  constructor(
    private googleAuth: GoogleAuthService
  ) {
    this.isLoggedIn$.next(!!this.getToken());
  }

  public getToken(): string {
    let token: string = localStorage.getItem(UserService.LOCAL_STORAGE_KEY);
    if (!token) {
      this.isLoggedIn$.next(true);
      this.signIn();
      // throw new Error('no token set , authentication required');
    }
    return localStorage.getItem(UserService.LOCAL_STORAGE_KEY);
  }

  public signIn(): void {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => this.signInSuccessHandler(res));
      });
  }
  public logout() {
    localStorage.removeItem(UserService.LOCAL_STORAGE_KEY);
    this.user = null;
    this.isLoggedIn$.next(false);
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.user = res;
    localStorage.setItem(
      UserService.LOCAL_STORAGE_KEY, res.getAuthResponse().access_token
    );
    this.isLoggedIn$.next(true);
  }
}
