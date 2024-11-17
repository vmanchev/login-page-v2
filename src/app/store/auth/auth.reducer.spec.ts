import { authReducer, AuthState } from './auth.reducer';
import {
  loginSuccessAction,
  loginErrorAction,
  logoutAction,
  isLoadingAction,
  resetErrorAction,
  resetEmailAction,
} from './auth.actions';

describe('AuthReducer', () => {
  const TEST_EMAIL = 'test@example.org';

  const initialState: AuthState = {
    email: null,
    isLoading: false,
    error: null,
  };

  it('should return the initial state when no action is provided', () => {
    const result = authReducer(undefined, { type: '' } as any);
    expect(result).toEqual(initialState);
  });

  it('should handle loginSuccessAction', () => {
    const payload = { email: TEST_EMAIL };
    const action = loginSuccessAction({ payload });
    const result = authReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      email: payload.email,
    });
  });

  it('should handle loginErrorAction', () => {
    const payload = { code: 400, message: 'Invalid credentials' };
    const action = loginErrorAction({ payload });
    const result = authReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: payload.message,
    });
  });

  it('should handle logoutAction', () => {
    const modifiedState: AuthState = {
      email: TEST_EMAIL,
      isLoading: false,
      error: null,
    };
    const action = logoutAction();
    const result = authReducer(modifiedState, action);

    expect(result).toEqual({
      ...modifiedState,
      email: initialState.email,
    });
  });

  it('should handle isLoadingAction', () => {
    const action = isLoadingAction({ isLoading: true });
    const result = authReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle resetErrorAction', () => {
    const modifiedState: AuthState = {
      email: null,
      isLoading: false,
      error: 'Some error occurred',
    };
    const action = resetErrorAction();
    const result = authReducer(modifiedState, action);

    expect(result).toEqual({
      ...modifiedState,
      error: initialState.error,
    });
  });

  it('should handle resetEmailAction', () => {
    const modifiedState: AuthState = {
      email: TEST_EMAIL,
      isLoading: false,
      error: null,
    };
    const action = resetEmailAction();
    const result = authReducer(modifiedState, action);

    expect(result).toEqual({
      ...modifiedState,
      email: initialState.email,
    });
  });
});
