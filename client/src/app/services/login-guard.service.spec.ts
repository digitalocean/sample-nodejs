import { TestBed } from '@angular/core/testing';

import { LoginGuardService } from './login-guard.service';

describe('LoginGuardService', () => {
  let service: LoginGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
