import { TestBed, inject } from '@angular/core/testing';

import { COANALISECLIENTESService } from './co-analise-clientes.service';

describe('COANALISECLIENTESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COANALISECLIENTESService]
    });
  });

  it('should be created', inject([COANALISECLIENTESService], (service: COANALISECLIENTESService) => {
    expect(service).toBeTruthy();
  }));
});
