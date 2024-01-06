import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { UserData } from '../models/userData';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _user: BehaviorSubject<UserData | null>;
  public user$: Observable<UserData | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this._user = new BehaviorSubject(JSON.parse(localStorage.getItem('userData')!));
    this.user$ = this._user.asObservable();
  }

  public get userValue() {
    return this._user.value;
  }

  public login(username: string, password: string) {
    return this.http.post<any>(`${environment.api_url}/auth/login`, { username, password })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('userData', JSON.stringify(user));
        //localStorage.setItem('settings', JSON.stringify(settings));
        this._user.next(user);
        // refresh GUI based on updated settings
        return user;
      }));
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this._user.next(null);
    this.router.navigate(['/login']);
  }
}