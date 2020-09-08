import { TestBed, inject } from '@angular/core/testing';

import { GERATUALIZACAOSILVERBITABELASService } from './ger-atualizacao-silver-bi-tabelas.service';

describe('GERATUALIZACAOSILVERBITABELASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERATUALIZACAOSILVERBITABELASService]
    });
  });

  it('should be created', inject([GERATUALIZACAOSILVERBITABELASService], (service: GERATUALIZACAOSILVERBITABELASService) => {
    expect(service).toBeTruthy();
  }));
});
