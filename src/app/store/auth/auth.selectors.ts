import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const errorMessage = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const email = createSelector(
  selectAuthState,
  (state: AuthState) => state.email
);
