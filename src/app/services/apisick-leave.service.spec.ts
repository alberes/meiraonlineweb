import { TestBed } from '@angular/core/testing';

import { APISickLeaveService } from './apisick-leave.service';

describe('APISickLeaveService', () => {
  let service: APISickLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APISickLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
