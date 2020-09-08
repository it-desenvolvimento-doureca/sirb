import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOService } from './rc-mov-reclamacao.service';

describe('RCMOVRECLAMACAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOService], (service: RCMOVRECLAMACAOService) => {
    expect(service).toBeTruthy();
  }));
});
