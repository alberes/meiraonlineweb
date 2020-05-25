import { TestBed } from '@angular/core/testing';

import { APIDomainService } from './apidomain.service';

describe('APIDomainService', () => {
  let service: APIDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
