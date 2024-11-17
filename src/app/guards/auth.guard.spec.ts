import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { authGuard } from './auth.guard';
import { AuthFasadeService } from '../store/auth/auth-fasade.service';
import { redirectAction } from '../store/common/common.actions';
import { LOGIN_PATH } from '../shared/constants';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

describe('authGuard', () => {
  const TEST_EMAIL = 'test@example.org';
  let mockAuthFacadeService: jasmine.SpyObj<AuthFasadeService>;
  let mockStore: jasmine.SpyObj<Store>;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    mockAuthFacadeService = jasmine.createSpyObj('AuthFasadeService', [
      'email$',
    ]);
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthFasadeService, useValue: mockAuthFacadeService },
        { provide: Store, useValue: mockStore },
      ],
    });
  });

  it('should allow navigation when email exists', (done) => {
    // arrange
    mockAuthFacadeService.email$ = of(TEST_EMAIL);

    // act
    const result$ = executeGuard(mockRoute, mockState);

    // assert
    (result$ as Observable<boolean>).subscribe((result) => {
      expect(result).toBeTrue();
      expect(mockStore.dispatch).not.toHaveBeenCalled();
      done();
    });
  });

  it('should prevent navigation and dispatch redirectAction when email does not exist', (done) => {
    // arrange
    mockAuthFacadeService.email$ = of(null);

    // act
    const result$ = executeGuard(mockRoute, mockState);

    // assert
    (result$ as Observable<boolean>).subscribe((result) => {
      expect(result).toBeFalse();
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        redirectAction({ path: LOGIN_PATH })
      );
      done();
    });
  });

  it('should prevent navigation and dispatch redirectAction on error', (done) => {
    // arrange
    mockAuthFacadeService.email$ = throwError(() => new Error('Test error'));

    // act
    const result$ = executeGuard(mockRoute, mockState);

    // assert
    (result$ as Observable<boolean>).subscribe((result) => {
      expect(result).toBeFalse();
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        redirectAction({ path: LOGIN_PATH })
      );
      done();
    });
  });
});
