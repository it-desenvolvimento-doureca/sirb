import { TestBed, inject } from '@angular/core/testing';

import { GERSECCAOUTZService } from './ger-seccao-utz.service';

describe('GERSECCAOUTZService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERSECCAOUTZService]
    });
  });

  it('should be created', inject([GERSECCAOUTZService], (service: GERSECCAOUTZService) => {
    expect(service).toBeTruthy();
  }));
});
