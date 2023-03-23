import { TestBed } from '@angular/core/testing';

import { AuthcaGuard } from './authca.guard';

describe('AuthcaGuard', () => {
  let guard: AuthcaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthcaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
