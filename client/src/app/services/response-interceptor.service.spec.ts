import { TestBed } from '@angular/core/testing';

import { ResponseInterceptorService } from './response-interceptor.service';

describe('ResponseInterceptorService', () => {
  let service: ResponseInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
