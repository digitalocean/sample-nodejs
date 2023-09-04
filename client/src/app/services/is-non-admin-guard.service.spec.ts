import { TestBed } from '@angular/core/testing';

import { IsNonAdminGuardService } from './is-non-admin-guard.service';

describe('IsNonAdminGuardService', () => {
  let service: IsNonAdminGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsNonAdminGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
