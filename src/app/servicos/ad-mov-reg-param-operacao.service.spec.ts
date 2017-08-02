import { TestBed, inject } from '@angular/core/testing';

import { ADMOVREGPARAMOPERACAOService } from './ad-mov-reg-param-operacao.service';

describe('ADMOVREGPARAMOPERACAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ADMOVREGPARAMOPERACAOService]
    });
  });

  it('should be created', inject([ADMOVREGPARAMOPERACAOService], (service: ADMOVREGPARAMOPERACAOService) => {
    expect(service).toBeTruthy();
  }));
});
