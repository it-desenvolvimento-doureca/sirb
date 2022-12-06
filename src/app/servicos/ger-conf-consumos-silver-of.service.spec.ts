import { TestBed, inject } from '@angular/core/testing';

import { GERCONFCONSUMOSSILVEROFService } from './ger-conf-consumos-silver-of.service';

describe('GERCONFCONSUMOSSILVEROFService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERCONFCONSUMOSSILVEROFService]
    });
  });

  it('should be created', inject([GERCONFCONSUMOSSILVEROFService], (service: GERCONFCONSUMOSSILVEROFService) => {
    expect(service).toBeTruthy();
  }));
});
