import { createAction, props } from '@ngrx/store';
import { AuthRequest } from '../../shared/interfaces/auth-request.interface';
import { AuthSuccessResponse } from '../../shared/interfaces/auth-success-response.interface';
import { AuthErrorResponse } from '../../shared/interfaces/auth-error-response.interface';
import { RememberMe } from '../../shared/interfaces/remember-me.interface';

export const loginRequestAction = createAction(
  '[Auth] Login request',
  props<{ payload: AuthRequest }>()
);
export const loginSuccessAction = createAction(
  '[Auth] Login success',
  props<{ payload: AuthSuccessResponse }>()
);
export const loginErrorAction = createAction(
  '[Auth] Login error',
  props<{ payload: AuthErrorResponse }>()
);

export const logoutAction = createAction('[Auth] Logout');

export const resetEmailAction = createAction('[Auth] Reset email');

export const isLoadingAction = createAction(
  '[Auth] Set loading state',
  props<{ isLoading: boolean }>()
);

export const resetErrorAction = createAction('[Auth] Reset error');
