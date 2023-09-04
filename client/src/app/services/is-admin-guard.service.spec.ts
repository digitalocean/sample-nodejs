import { TestBed } from '@angular/core/testing';

import { IsAdminGuardService } from './is-admin-guard.service';

describe('IsAdminGuardService', () => {
  let service: IsAdminGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAdminGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
