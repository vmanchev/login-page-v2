import { TestBed } from '@angular/core/testing';
import { AuthFasadeService } from './auth-fasade.service';
import { Store } from '@ngrx/store';
import { loginRequestAction, logoutAction } from './auth.actions';
import { AuthRequest } from '../../shared/interfaces/auth-request.interface';

describe('AuthFasadeService', () => {
  let service: AuthFasadeService;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    TestBed.configureTestingModule({
      providers: [
        AuthFasadeService,
        { provide: Store, useValue: storeMock },
      ],
    });

    service = TestBed.inject(AuthFasadeService);
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should dispatch loginRequestAction with the correct payload', () => {
      const payload: AuthRequest = {
        username: 'test@example.com',
        password: 'password123',
      };

      service.login(payload);

      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        loginRequestAction({ payload })
      );
    });
  });

  describe('logout', () => {
    it('should dispatch logoutAction', () => {
      service.logout();

      expect(storeSpy.dispatch).toHaveBeenCalledWith(logoutAction());
    });
  });
});
