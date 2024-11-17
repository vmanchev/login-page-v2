import { inject, Injectable } from '@angular/core';
import { email, errorMessage, isLoading } from './auth.selectors';
import { Store } from '@ngrx/store';
import { loginRequestAction, logoutAction } from './auth.actions';
import { AuthRequest } from '../../shared/interfaces/auth-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthFasadeService {
  private store = inject(Store);

  isLoading$ = this.store.select(isLoading);
  errorMessage$ = this.store.select(errorMessage);
  email$ = this.store.select(email);

  login(payload: AuthRequest): void {
    this.store.dispatch(
      loginRequestAction({
        payload,
      })
    );
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
