import { TestBed, inject } from '@angular/core/testing';

import { GERSECCAOService } from './ger-seccao.service';

describe('GERSECCAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERSECCAOService]
    });
  });

  it('should be created', inject([GERSECCAOService], (service: GERSECCAOService) => {
    expect(service).toBeTruthy();
  }));
});
