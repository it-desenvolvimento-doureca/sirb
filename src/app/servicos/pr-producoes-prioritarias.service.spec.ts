import { TestBed, inject } from '@angular/core/testing';

import { PRPRODUCOESPRIORITARIASService } from './pr-producoes-prioritarias.service';

describe('PRPRODUCOESPRIORITARIASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRPRODUCOESPRIORITARIASService]
    });
  });

  it('should be created', inject([PRPRODUCOESPRIORITARIASService], (service: PRPRODUCOESPRIORITARIASService) => {
    expect(service).toBeTruthy();
  }));
});
