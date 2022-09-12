import { TestBed, inject } from '@angular/core/testing';

import { PRDICALERTASDESCARGAService } from './pr-dic-alertas-descarga.service';

describe('PRDICALERTASDESCARGAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICALERTASDESCARGAService]
    });
  });

  it('should be created', inject([PRDICALERTASDESCARGAService], (service: PRDICALERTASDESCARGAService) => {
    expect(service).toBeTruthy();
  }));
});
