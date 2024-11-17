import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonEffects } from './common.effects';
import { redirectAction } from './common.actions';

describe('CommonEffects', () => {
  let effects: CommonEffects;
  let actions$: Observable<any>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        CommonEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: mockRouter },
      ],
    });

    effects = TestBed.inject(CommonEffects);
  });

  it('should navigate to the given path when redirectAction is dispatched', (done) => {
    // Arrange: Create a mock action
    const action = redirectAction({ path: '/test-path' });
    actions$ = of(action);

    // Act: Trigger the effect
    effects.redirect$.subscribe(() => {
      // Assert: Ensure navigate was called with the correct path
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/test-path']);
      done();
    });
  });
});
