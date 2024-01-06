import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { UserData } from '../models/userData';
import { Observable } from 'rxjs';
import { LoginCredentials, RegistrationCredentials } from '../models/credentials';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _apiService: ApiService) {}

  /*
  public user$(): Observable<{ userData: UserData }> {
    return this._apiService.get('/user');
  }
  */

  public login$(credentials: LoginCredentials): Observable<UserData> {
    return this._apiService
      .post( '/auth/login', credentials)
      .pipe( map<any, UserData>(res => res.userData));
  }

  public register$(credentials: RegistrationCredentials): Observable<string[]> {
    return this._apiService
      .post( '/user/register', {
        username: credentials.username,
        email:    credentials.email,
        password: credentials.password,
        role:     'USER',
      });
  }
}
