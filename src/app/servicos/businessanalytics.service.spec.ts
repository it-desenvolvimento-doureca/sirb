import { TestBed, inject } from '@angular/core/testing';

import { BusinessanalyticsService } from './businessanalytics.service';

describe('BusinessanalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessanalyticsService]
    });
  });

  it('should be created', inject([BusinessanalyticsService], (service: BusinessanalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
