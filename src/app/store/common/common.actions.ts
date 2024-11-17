import { createAction, props } from '@ngrx/store';
import { AuthRequest } from '../../shared/interfaces/auth-request.interface';
import { AuthSuccessResponse } from '../../shared/interfaces/auth-success-response.interface';
import { AuthErrorResponse } from '../../shared/interfaces/auth-error-response.interface';
import { RememberMe } from '../../shared/interfaces/remember-me.interface';

export const redirectAction = createAction(
  '[Common] Redirect',
  props<{ path: string }>()
);
