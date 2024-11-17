import { createReducer, on } from '@ngrx/store';
import {
  isLoadingAction,
  loginErrorAction,
  loginSuccessAction,
  logoutAction,
  resetEmailAction,
  resetErrorAction,
} from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  email: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  email: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccessAction, (state, { payload }) => ({
    ...state,
    email: payload.email,
  })),
  on(loginErrorAction, (state, { payload }) => ({
    ...initialState,
    error: payload.message,
  })),
  on(logoutAction, (state) => ({ ...state, email: initialState.email })),
  on(isLoadingAction, (state, { isLoading }) => ({ ...state, isLoading })),
  on(resetErrorAction, (state) => ({ ...state, error: initialState.error })),
  on(resetEmailAction, (state) => ({ ...state, email: initialState.email }))
);
