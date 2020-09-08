import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOTIPONAODETECAOService } from './rc-mov-reclamacao-tipo-nao-detecao.service';

describe('RCMOVRECLAMACAOTIPONAODETECAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOTIPONAODETECAOService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOTIPONAODETECAOService], (service: RCMOVRECLAMACAOTIPONAODETECAOService) => {
    expect(service).toBeTruthy();
  }));
});
