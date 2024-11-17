import { isLoading, errorMessage, email, selectAuthState } from './auth.selectors';
import { AuthState } from './auth.reducer';

describe('Auth Selectors', () => {
  const initialState: AuthState = {
    email: null,
    isLoading: false,
    error: null,
  };

  const populatedState: AuthState = {
    email: 'test@example.com',
    isLoading: true,
    error: 'An error occurred',
  };

  describe('selectAuthState', () => {
    it('should select the entire auth state', () => {
      const result = selectAuthState.projector(initialState);

      expect(result).toEqual(initialState);
    });
  });

  describe('isLoading Selector', () => {
    it('should return the isLoading state', () => {
      const result = isLoading.projector(populatedState);

      expect(result).toBe(true);
    });

    it('should return false if not loading', () => {
      const result = isLoading.projector(initialState);

      expect(result).toBe(false);
    });
  });

  describe('errorMessage Selector', () => {
    it('should return the error message', () => {
      const result = errorMessage.projector(populatedState);

      expect(result).toBe('An error occurred');
    });

    it('should return null if no error', () => {
      const result = errorMessage.projector(initialState);

      expect(result).toBeNull();
    });
  });

  describe('email Selector', () => {
    it('should return the email address', () => {
      const result = email.projector(populatedState);

      expect(result).toBe('test@example.com');
    });

    it('should return null if email is not set', () => {
      const result = email.projector(initialState);

      expect(result).toBeNull();
    });
  });
});
