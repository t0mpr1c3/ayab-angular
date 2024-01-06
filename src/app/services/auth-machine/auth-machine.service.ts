import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  createActor,
  createMachine,
  assign,
  fromObservable,
  ProvidedActor,
  ParameterizedObject,
  StateMachine,
  Actor,
  ResolveTypegenMeta,
  AnyActorRef,
  StateValue,
  TypegenDisabled,
  fromPromise,
} from 'xstate';

import { AuthService } from '../auth.service';
import { AuthEvent, Init, LoginSubmit, LoginSuccess, LoginFail } from './auth-machine.events';
import { AuthContext, authMachineConfig } from './auth-machine.config';
import { CancelService } from '../cancel.service';
import { UserData, defaultUserData } from '../../models/userData';
import { isLoggedOut } from '../../helpers/auth';
import { LoginCredentials } from '../../models/credentials';

@Injectable({ providedIn: 'root' })
export class AuthMachineService {
  private _authMachine = createMachine(authMachineConfig).provide({
    actors: {
      dummy:
        fromPromise(() => new Promise<boolean>(() => true)),
      requestLogin:
        fromObservable<LoginSuccess|LoginFail, LoginSubmit>(
          ({ input }) => 
            this._authService
              .login$(new LoginCredentials(input.username, input.password))
              .pipe(
                map<UserData, LoginSuccess>((userData) => {
                  let output = new LoginSuccess(userData);
                  this.service.send(output); // ??? don't know why parent is not subscribed
                  return output;
                })
              )
        )
    },
    actions: {
      assignUser: 
        assign({
          userData: ({ event }) => {   
            let _event = event as LoginSuccess;
            localStorage.setItem('userData', JSON.stringify(_event.userData));
            this._user.next(_event.userData);
            return _event.userData;
          }
        }),
      assignErrors: 
        assign({
          errors: ({ event }) => {   
            let _event = event as LoginFail;
            let result = Object
              .keys(_event.error.error || {})
              .map(key => `Error ${key}: ${_event.error.error[key]}`);
            console.log(result);
            return result;
          }
        }),
      closeLoginDialog:
        () => this._cancelService.emit(),
      releaseUser: 
        assign({
          userData: () => {
            localStorage.removeItem('userData');
            this._user.next(null);
            return defaultUserData;
          }
        }),
    },
    guards: {
      isLoggedOut: () => isLoggedOut(),
    },
  });

  public service: Actor<
    StateMachine<
      AuthContext,
      AuthEvent,
      Record<string, AnyActorRef>,
      ProvidedActor,
      ParameterizedObject,
      ParameterizedObject,
      string,
      StateValue,
      string,
      unknown,
      unknown,
      ResolveTypegenMeta<
        TypegenDisabled,
        AuthEvent,
        ProvidedActor,
        ParameterizedObject,
        ParameterizedObject,
        string,
        string
      >
    >
  >;

  public send(event: AuthEvent): void {
    this.service.send(event);
  }

  private _user: BehaviorSubject<UserData|null>;
  public user$: Observable<UserData|null>;
  public loggedIn$: Observable<boolean>;
  
  constructor(
    private _authService: AuthService,
    private _cancelService: CancelService,
  ) {
    this.service = createActor(this._authMachine, { devTools: true }).start();
    this.service.send(new Init(isLoggedOut()));
    this._user = new BehaviorSubject<UserData|null>(
      JSON.parse(localStorage.getItem('userData')!)
    );
  }

  public user(): Observable<UserData|null> {
    return this._user.asObservable();
  }

  public loggedIn(): Observable<boolean> {
    return this.user().pipe( map<UserData|null, boolean>(user => (user !== null)));
  }
}
