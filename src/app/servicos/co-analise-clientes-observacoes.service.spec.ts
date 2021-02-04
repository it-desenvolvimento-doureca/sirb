import { TestBed, inject } from '@angular/core/testing';

import { COANALISECLIENTESOBSERVACOESService } from './co-analise-clientes-observacoes.service';

describe('COANALISECLIENTESOBSERVACOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COANALISECLIENTESOBSERVACOESService]
    });
  });

  it('should be created', inject([COANALISECLIENTESOBSERVACOESService], (service: COANALISECLIENTESOBSERVACOESService) => {
    expect(service).toBeTruthy();
  }));
});
