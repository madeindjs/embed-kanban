// src/app/users.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { disconnectAction, loginAction } from './login.actions';
import { LoggedUser } from './login.service';

export interface LoginState {
  user?: LoggedUser;
}

export const initialState: LoginState = { user: undefined };

const _loginReducer = createReducer(
  initialState,
  on(loginAction, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(disconnectAction, (state) => ({
    ...state,
    user: undefined,
  }))
);

export function loginReducer(state: LoginState, action: any) {
  return _loginReducer(state, action);
}
