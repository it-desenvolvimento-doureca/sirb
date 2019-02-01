import { TestBed, inject } from '@angular/core/testing';

import { GERPOSTOSService } from './ger-postos.service';

describe('GERPOSTOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERPOSTOSService]
    });
  });

  it('should be created', inject([GERPOSTOSService], (service: GERPOSTOSService) => {
    expect(service).toBeTruthy();
  }));
});
