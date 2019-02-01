import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOENCOMENDASService } from './rc-mov-reclamacao-encomendas.service';

describe('RCMOVRECLAMACAOENCOMENDASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOENCOMENDASService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOENCOMENDASService], (service: RCMOVRECLAMACAOENCOMENDASService) => {
    expect(service).toBeTruthy();
  }));
});
