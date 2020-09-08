import { TestBed, inject } from '@angular/core/testing';

import { RHDICCACIFOSService } from './rh-dic-cacifos.service';

describe('RHDICCACIFOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHDICCACIFOSService]
    });
  });

  it('should be created', inject([RHDICCACIFOSService], (service: RHDICCACIFOSService) => {
    expect(service).toBeTruthy();
  }));
});
