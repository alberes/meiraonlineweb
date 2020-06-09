import { TestBed } from '@angular/core/testing';

import { APISchoolCalendarService } from './apischool-calendar.service';

describe('APISchoolCalendarService', () => {
  let service: APISchoolCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APISchoolCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
