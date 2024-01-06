import { MachineConfig, ParameterizedObject, ProvidedActor } from "xstate";

import { UserData, defaultUserData } from "../../models/userData";
import { AuthEvent, LoginSubmit } from "./auth-machine.events";

export interface AuthContext {
  userData: UserData;
  errors: string[];
}

export const defaultContext: AuthContext = {
  userData: defaultUserData,
  errors: []
};

export const authMachineConfig: MachineConfig<
  AuthContext,
  AuthEvent,
  ProvidedActor,
  ParameterizedObject,
  ParameterizedObject,
  string,
  string
> = {
  id: 'login',
  context: defaultContext,
  initial: 'boot',
  states: {
    boot: {
      invoke: {
        src: 'dummy',
        input: () => {
          console.log('state: boot')
        },
      },
      on: {
        INIT: [
          { target: 'loggedOut', guard: 'isLoggedOut' },
          { target: 'loggedIn' }
        ]
      }
    },
    loggedOut: {
      invoke: {
        src: 'dummy',
        input: () => {
          console.log('state: loggedOut')
        },
      },
      on: {
        SUBMIT: 'loading'
      }
    },
    loggedIn: {
      invoke: {
        src: 'dummy',
        input: () => {
          console.log('state: loggedIn')
        },
      },
      on: {
        LOGOUT: {
          target: 'loggedOut',
          actions: 'releaseUser',
        }
      }
    },
    requestErr: {
      // FIXME display login errors
      invoke: {
        src: 'dummy',
        input: () => {
          console.log('state: requestErr')
        },
      },
      after: {
        // short delay to debounce submit
        500: { target: 'loggedOut' },
      }
    },
    loading: {
      invoke: {
        id: 'loginActor',
        src: 'requestLogin',
        input: ({ event }) => {
          console.log('state: loading')
          let _event = event as LoginSubmit;
          return _event;
        },
        onError: {
          target: 'requestErr',
          actions: 'assignErrors',
        }
      },
      on: {
        SUCCESS: {
          target: 'loggedIn',
          actions: [
            'assignUser',
            'closeLoginDialog',
          ],
        },
      }
    }
  }
}
