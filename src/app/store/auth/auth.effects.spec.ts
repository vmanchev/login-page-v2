import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cold } from 'jasmine-marbles';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../../shared/services/auth.service';
import { logoutAction, resetEmailAction } from './auth.actions';
import { redirectAction } from '../common/common.actions';
import { LOGIN_PATH } from '../../shared/constants';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: Observable<Action>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore({}),
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    store = TestBed.inject(Store) as MockStore;
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('$logout', () => {
    it('should return resetEmail and redirect actions', () => {
      // arrange
      actions$ = cold('a', {
        a: logoutAction(),
      });

      const expected = cold('(ab)', {
        a: resetEmailAction(),
        b: redirectAction({ path: LOGIN_PATH }),
      });

      // assert
      expect(effects.logout$).toBeObservable(expected);
    });
  });
});
