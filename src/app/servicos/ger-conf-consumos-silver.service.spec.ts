import { TestBed, inject } from '@angular/core/testing';

import { GERCONFCONSUMOSSILVERService } from './ger-conf-consumos-silver.service';

describe('GERCONFCONSUMOSSILVERService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERCONFCONSUMOSSILVERService]
    });
  });

  it('should be created', inject([GERCONFCONSUMOSSILVERService], (service: GERCONFCONSUMOSSILVERService) => {
    expect(service).toBeTruthy();
  }));
});
