import { TestBed, inject } from '@angular/core/testing';

import { GERDEPARTAMENTOService } from './ger-departamento.service';

describe('GERDEPARTAMENTOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERDEPARTAMENTOService]
    });
  });

  it('should be created', inject([GERDEPARTAMENTOService], (service: GERDEPARTAMENTOService) => {
    expect(service).toBeTruthy();
  }));
});
