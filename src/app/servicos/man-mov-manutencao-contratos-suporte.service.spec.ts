import { TestBed, inject } from '@angular/core/testing';

import { MANMOVMANUTENCAOCONTRATOSSUPORTEService } from './man-mov-manutencao-contratos-suporte.service';

describe('MANMOVMANUTENCAOCONTRATOSSUPORTEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVMANUTENCAOCONTRATOSSUPORTEService]
    });
  });

  it('should be created', inject([MANMOVMANUTENCAOCONTRATOSSUPORTEService], (service: MANMOVMANUTENCAOCONTRATOSSUPORTEService) => {
    expect(service).toBeTruthy();
  }));
});
