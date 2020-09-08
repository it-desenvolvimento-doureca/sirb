import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOENVIOSGARANTIDOSService } from './rc-mov-reclamacao-envios-garantidos.service';

describe('RCMOVRECLAMACAOENVIOSGARANTIDOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOENVIOSGARANTIDOSService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOENVIOSGARANTIDOSService], (service: RCMOVRECLAMACAOENVIOSGARANTIDOSService) => {
    expect(service).toBeTruthy();
  }));
});
