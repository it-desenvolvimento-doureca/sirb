import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOFICHEIROSService } from './rc-mov-reclamacao-ficheiros.service';

describe('RCMOVRECLAMACAOFICHEIROSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOFICHEIROSService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOFICHEIROSService], (service: RCMOVRECLAMACAOFICHEIROSService) => {
    expect(service).toBeTruthy();
  }));
});
