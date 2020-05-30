import { TestBed } from '@angular/core/testing';

import { APINoticeTerminationService } from './apinotice-termination.service';

describe('APINoticeTerminationService', () => {
  let service: APINoticeTerminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APINoticeTerminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
