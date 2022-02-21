import { TestBed, inject } from '@angular/core/testing';

import { PEMOVFICHEIROSService } from './pe-mov-ficheiros.service';

describe('PEMOVFICHEIROSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PEMOVFICHEIROSService]
    });
  });

  it('should be created', inject([PEMOVFICHEIROSService], (service: PEMOVFICHEIROSService) => {
    expect(service).toBeTruthy();
  }));
});
