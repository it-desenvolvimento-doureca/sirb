import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOFORNECEDORService } from './rc-mov-reclamacao-fornecedor.service';

describe('RCMOVRECLAMACAOFORNECEDORService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOFORNECEDORService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOFORNECEDORService], (service: RCMOVRECLAMACAOFORNECEDORService) => {
    expect(service).toBeTruthy();
  }));
});
