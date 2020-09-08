import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOPLANOACCOESCORRETIVASService } from './rc-mov-reclamacao-plano-accoes-corretivas.service';

describe('RCMOVRECLAMACAOPLANOACCOESCORRETIVASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOPLANOACCOESCORRETIVASService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOPLANOACCOESCORRETIVASService], (service: RCMOVRECLAMACAOPLANOACCOESCORRETIVASService) => {
    expect(service).toBeTruthy();
  }));
});
