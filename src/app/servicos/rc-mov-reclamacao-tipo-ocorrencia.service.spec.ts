import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOTIPOOCORRENCIAService } from './rc-mov-reclamacao-tipo-ocorrencia.service';

describe('RCMOVRECLAMACAOTIPOOCORRENCIAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOTIPOOCORRENCIAService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOTIPOOCORRENCIAService], (service: RCMOVRECLAMACAOTIPOOCORRENCIAService) => {
    expect(service).toBeTruthy();
  }));
});
