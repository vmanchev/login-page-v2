import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  debounceTime,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import {
  isLoadingAction,
  loginErrorAction,
  loginRequestAction,
  loginSuccessAction,
  logoutAction,
  resetEmailAction,
  resetErrorAction,
} from './auth.actions';
import { AuthSuccessResponse } from '../../shared/interfaces/auth-success-response.interface';
import { from, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { redirectAction } from '../common/common.actions';
import { HOME_PATH, LOGIN_PATH } from '../../shared/constants';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private store = inject(Store);

  loginRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginRequestAction),
      tap(() => {
        this.store.dispatch(isLoadingAction({ isLoading: true }));
        this.store.dispatch(resetErrorAction());
      }),
      debounceTime(3000),
      switchMap(({ payload }) =>
        this.authService.login(payload).pipe(
          concatMap((authResponse: AuthSuccessResponse) =>
            from([
              loginSuccessAction({
                payload: authResponse,
              }),
              isLoadingAction({ isLoading: false }),
              redirectAction({ path: HOME_PATH }),
            ])
          ),
          catchError((err) => of(loginErrorAction({ payload: err.error }))),
          finalize(() => of(isLoadingAction({ isLoading: false })))
        )
      )
    );
  });

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      concatMap(() =>
        from([resetEmailAction(), redirectAction({ path: LOGIN_PATH })])
      )
    )
  );
}
