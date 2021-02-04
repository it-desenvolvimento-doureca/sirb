import { TestBed, inject } from '@angular/core/testing';

import { COANALISECLIENTESACCOESService } from './co-analise-clientes-accoes.service';

describe('COANALISECLIENTESACCOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COANALISECLIENTESACCOESService]
    });
  });

  it('should be created', inject([COANALISECLIENTESACCOESService], (service: COANALISECLIENTESACCOESService) => {
    expect(service).toBeTruthy();
  }));
});
