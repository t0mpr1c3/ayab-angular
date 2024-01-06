import { UserData } from '../../models/userData';

export class Init {
  readonly type = 'INIT';
  constructor(public isLoggedOut: boolean) {}
}

export class LoginSubmit {
  readonly type = 'SUBMIT';
  constructor(public username: string, public password: string) {}
}

export class LoginFail {
  readonly type = 'FAILURE';
  constructor(public error: { error: Error }) {}
}

export class LoginSuccess {
  readonly type = 'SUCCESS';
  constructor(public userData: UserData) {}
}

export class Logout {
  readonly type = 'LOGOUT';
}

export type AuthEvent = Init | LoginSubmit | LoginSuccess | LoginFail | Logout;

export interface Error {
  [key: string]: string;
}
