import { TestBed, inject } from '@angular/core/testing';

import { PEMOVCABService } from './pe-mov-cab.service';

describe('PEMOVCABService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PEMOVCABService]
    });
  });

  it('should be created', inject([PEMOVCABService], (service: PEMOVCABService) => {
    expect(service).toBeTruthy();
  }));
});
