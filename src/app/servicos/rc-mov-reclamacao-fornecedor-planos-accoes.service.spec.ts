import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService } from './rc-mov-reclamacao-fornecedor-planos-accoes.service';

describe('RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService], (service: RCMOVRECLAMACAOFORNECEDORPLANOSACCOESService) => {
    expect(service).toBeTruthy();
  }));
});
