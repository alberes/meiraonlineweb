import { TestBed } from '@angular/core/testing';

import { APIEmployerUnionContributionService } from './apiemployer-union-contribution.service';

describe('APIEmployerUnionContributionService', () => {
  let service: APIEmployerUnionContributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIEmployerUnionContributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
