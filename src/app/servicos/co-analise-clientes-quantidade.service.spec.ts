import { TestBed, inject } from '@angular/core/testing';

import { COANALISECLIENTESQUANTIDADEService } from './co-analise-clientes-quantidade.service';

describe('COANALISECLIENTESQUANTIDADEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COANALISECLIENTESQUANTIDADEService]
    });
  });

  it('should be created', inject([COANALISECLIENTESQUANTIDADEService], (service: COANALISECLIENTESQUANTIDADEService) => {
    expect(service).toBeTruthy();
  }));
});
