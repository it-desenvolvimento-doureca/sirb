import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOFICHEIROSFORNECEDORService } from './rc-mov-reclamacao-ficheiros-fornecedor.service';

describe('RCMOVRECLAMACAOFICHEIROSFORNECEDORService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOFICHEIROSFORNECEDORService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOFICHEIROSFORNECEDORService], (service: RCMOVRECLAMACAOFICHEIROSFORNECEDORService) => {
    expect(service).toBeTruthy();
  }));
});
