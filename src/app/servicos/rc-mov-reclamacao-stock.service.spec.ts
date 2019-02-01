import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOSTOCKService } from './rc-mov-reclamacao-stock.service';

describe('RCMOVRECLAMACAOSTOCKService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOSTOCKService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOSTOCKService], (service: RCMOVRECLAMACAOSTOCKService) => {
    expect(service).toBeTruthy();
  }));
});
