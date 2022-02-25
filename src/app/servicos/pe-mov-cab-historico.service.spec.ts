import { TestBed, inject } from '@angular/core/testing';

import { PEMOVCABHISTORICOService } from './pe-mov-cab-historico.service';

describe('PEMOVCABHISTORICOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PEMOVCABHISTORICOService]
    });
  });

  it('should be created', inject([PEMOVCABHISTORICOService], (service: PEMOVCABHISTORICOService) => {
    expect(service).toBeTruthy();
  }));
});
