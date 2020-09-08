import { TestBed, inject } from '@angular/core/testing';

import { GERDEPARTAMENTOSSECTORESService } from './ger-departamentos-sectores.service';

describe('GERDEPARTAMENTOSSECTORESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERDEPARTAMENTOSSECTORESService]
    });
  });

  it('should be created', inject([GERDEPARTAMENTOSSECTORESService], (service: GERDEPARTAMENTOSSECTORESService) => {
    expect(service).toBeTruthy();
  }));
});
