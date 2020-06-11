import { TestBed } from '@angular/core/testing';

import { APIPreliminaryRegistrationService } from './apipreliminary-registration.service';

describe('APIPreliminaryRegistrationService', () => {
  let service: APIPreliminaryRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIPreliminaryRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
