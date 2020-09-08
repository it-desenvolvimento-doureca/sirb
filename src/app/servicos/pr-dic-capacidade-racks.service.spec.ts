import { TestBed, inject } from '@angular/core/testing';

import { PRDICCAPACIDADERACKSService } from './pr-dic-capacidade-racks.service';

describe('PRDICCAPACIDADERACKSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICCAPACIDADERACKSService]
    });
  });

  it('should be created', inject([PRDICCAPACIDADERACKSService], (service: PRDICCAPACIDADERACKSService) => {
    expect(service).toBeTruthy();
  }));
});
