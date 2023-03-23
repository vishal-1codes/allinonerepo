import { TestBed } from '@angular/core/testing';

import { AuthcaService } from './authca.service';

describe('AuthcaService', () => {
  let service: AuthcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
