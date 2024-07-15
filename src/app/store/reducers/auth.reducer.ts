import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from '../actions/auth.actions';

export interface AuthState {
  user: any;
}

export const initialState: AuthState = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({ ...state, user })),
  on(logout, (state) => ({ ...state, user: null }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
