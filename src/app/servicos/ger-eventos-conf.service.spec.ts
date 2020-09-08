import { TestBed, inject } from '@angular/core/testing';

import { GEREVENTOSCONFService } from './ger-eventos-conf.service';

describe('GEREVENTOSCONFService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GEREVENTOSCONFService]
    });
  });

  it('should be created', inject([GEREVENTOSCONFService], (service: GEREVENTOSCONFService) => {
    expect(service).toBeTruthy();
  }));
});
