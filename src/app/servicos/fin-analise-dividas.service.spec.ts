import { TestBed, inject } from '@angular/core/testing';

import { FINANALISEDIVIDASService } from './fin-analise-dividas.service';

describe('FINANALISEDIVIDASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FINANALISEDIVIDASService]
    });
  });

  it('should be created', inject([FINANALISEDIVIDASService], (service: FINANALISEDIVIDASService) => {
    expect(service).toBeTruthy();
  }));
});
