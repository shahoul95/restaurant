import { TestBed } from '@angular/core/testing';

import { AuthsecurityService } from './authsecurity.service';

describe('AuthsecurityService', () => {
  let service: AuthsecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthsecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
