import { TestBed, inject } from '@angular/core/testing';

import { PRREVISOESPRIORITARIASService } from './pr-revisoes-prioritarias.service';

describe('PRREVISOESPRIORITARIASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRREVISOESPRIORITARIASService]
    });
  });

  it('should be created', inject([PRREVISOESPRIORITARIASService], (service: PRREVISOESPRIORITARIASService) => {
    expect(service).toBeTruthy();
  }));
});
