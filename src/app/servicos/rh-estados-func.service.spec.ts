import { TestBed, inject } from '@angular/core/testing';

import { RHESTADOSFUNCService } from './rh-estados-func.service';

describe('RHESTADOSFUNCService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHESTADOSFUNCService]
    });
  });

  it('should be created', inject([RHESTADOSFUNCService], (service: RHESTADOSFUNCService) => {
    expect(service).toBeTruthy();
  }));
});
