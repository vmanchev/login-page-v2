import { TestBed } from '@angular/core/testing';

import { AuthFasadeService } from './auth-fasade.service';

describe('AuthFasadeService', () => {
  let service: AuthFasadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFasadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
