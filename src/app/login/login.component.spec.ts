import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RememberMeService } from '../shared/services/remember-me.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFasadeService } from '../store/auth/auth-fasade.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const TEST_EMAIL = 'test@example.org';
  const TEST_PASSWORD = 'test123';

  const AuthFasadeServiceMock = jasmine.createSpyObj('AuthFasadeService', [
    'login',
  ]);
  const RememberMeServiceMock = jasmine.createSpyObj('RememberMeService', [
    'set',
    'get',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        LoginComponent,
        { provide: AuthFasadeService, useValue: AuthFasadeServiceMock },
        { provide: RememberMeService, useValue: RememberMeServiceMock },
      ],
    })
      .overrideComponent(LoginComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should create the form with default initial values', () => {
      // arrange
      RememberMeServiceMock.get.and.returnValue(undefined);

      // act
      const component =
        TestBed.createComponent(LoginComponent).componentInstance;
      component.ngOnInit();

      // assert
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm!.get('username')).toBeDefined();
      expect(component.loginForm!.get('password')).toBeDefined();
      expect(component.loginForm!.get('rememverMe')).toBeDefined();
      expect(component.loginForm?.value).toEqual({
        username: null,
        password: null,
        rememberMe: false,
      });
    });

    describe('when rememberMe was not clicked previously', () => {
      it('should have username set to null', () => {
        // arrange
        RememberMeServiceMock.get.and.returnValue(undefined);

        // act
        const component =
          TestBed.createComponent(LoginComponent).componentInstance;
        component.ngOnInit();

        // assert
        expect(component.loginForm?.value.username).toBeNull();
      });

      it('should have rememberMe set to false', () => {
        // arrange
        RememberMeServiceMock.get.and.returnValue(undefined);

        // act
        const component =
          TestBed.createComponent(LoginComponent).componentInstance;
        component.ngOnInit();

        // assert
        expect(component.loginForm?.value.rememberMe).toBeFalse();
      });
    });

    describe('when rememberMe was clicked previously', () => {
      it('should have username set to TEST_EMAIL', () => {
        // arrange
        RememberMeServiceMock.get.and.returnValue(TEST_EMAIL);

        // act
        const component =
          TestBed.createComponent(LoginComponent).componentInstance;
        component.ngOnInit();

        expect(component.loginForm?.value.username).toBe(TEST_EMAIL);
      });

      it('should have rememberMe set to true', () => {
        // arrange
        RememberMeServiceMock.get.and.returnValue(TEST_EMAIL);

        // act
        const component =
          TestBed.createComponent(LoginComponent).componentInstance;
        component.ngOnInit();

        expect(component.loginForm?.value.rememberMe).toBeTrue();
      });
    });
  });

  describe('onSubmit', () => {
    describe('when loginForm is not available', () => {
      beforeEach(() => {
        // arrange
        RememberMeServiceMock.set.calls.reset();
        AuthFasadeServiceMock.login.calls.reset();
        component.loginForm = undefined;
        component.isSubmitted = false;
        fixture.detectChanges();

        // act
        component.onSubmit();
      });

      it('should have isSubmitted set to false', () => {
        // assert
        expect(component.isSubmitted).toBeFalse();
      });

      it('should not call RememberMeService.set()', () => {
        // assert
        expect(RememberMeServiceMock.set).not.toHaveBeenCalled();
      });

      it('should not call AuthFasadeService.login()', () => {
        // assert
        expect(AuthFasadeServiceMock.login).not.toHaveBeenCalled();
      });
    });

    describe('when loginForm is available', () => {
      it('should have isSubmitted set to true', () => {
        const component =
          TestBed.createComponent(LoginComponent).componentInstance;
        component.ngOnInit();
        component.onSubmit();

        // assert
        expect(component.isSubmitted).toBeTrue();
      });
    });

    describe('when form is invalid', () => {
      beforeEach(() => {
        // arrange
        RememberMeServiceMock.set.calls.reset();
        AuthFasadeServiceMock.login.calls.reset();
        component.loginForm?.reset();
        component.isSubmitted = false;
        fixture.detectChanges();

        // act
        component.onSubmit();
      });

      it('should not call RememberMeService.set()', () => {
        // assert
        expect(RememberMeServiceMock.set).not.toHaveBeenCalled();
      });

      it('should not call AuthFasadeService.login()', () => {
        // assert
        expect(AuthFasadeServiceMock.login).not.toHaveBeenCalled();
      });
    });

    describe('when form is valid', () => {
      beforeEach(() => {
        // arrange
        RememberMeServiceMock.set.calls.reset();
        AuthFasadeServiceMock.login.calls.reset();
        component.loginForm?.setValue({
          username: TEST_EMAIL,
          password: TEST_PASSWORD,
          rememberMe: true,
        });
        component.isSubmitted = false;
        fixture.detectChanges();

        // act
        component.onSubmit();
      });

      it('should call RememberMeService.set() with `true` and `TEST_EMAIL`', () => {
        // assert
        expect(RememberMeServiceMock.set).toHaveBeenCalledWith(
          true,
          TEST_EMAIL
        );
      });

      it('should call AuthStoreMock.login() with expected payload', () => {
        // assert
        expect(AuthFasadeServiceMock.login).toHaveBeenCalledWith({
          username: TEST_EMAIL,
          password: TEST_PASSWORD,
        });
      });
    });
  });
});
