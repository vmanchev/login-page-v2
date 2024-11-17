import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthFasadeService } from '../store/auth/auth-fasade.service';
import { redirectAction } from '../store/common/common.actions';
import { LOGIN_PATH } from '../shared/constants';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authFacadeService = inject(AuthFasadeService);
  const store = inject(Store);

  return authFacadeService.email$.pipe(
    map((email) => {
      if (email) {
        return true;
      }

      store.dispatch(redirectAction({ path: LOGIN_PATH }));
      return false;
    }),
    catchError(() => {
      store.dispatch(redirectAction({ path: LOGIN_PATH }));
      return of(false);
    })
  );
};
