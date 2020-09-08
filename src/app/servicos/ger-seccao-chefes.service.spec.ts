import { TestBed, inject } from '@angular/core/testing';

import { GERSECCAOCHEFESService } from './ger-seccao-chefes.service';

describe('GERSECCAOCHEFESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERSECCAOCHEFESService]
    });
  });

  it('should be created', inject([GERSECCAOCHEFESService], (service: GERSECCAOCHEFESService) => {
    expect(service).toBeTruthy();
  }));
});
