import { TestBed, inject } from '@angular/core/testing';

import { FINSEGUIMENTOFATURACAOANUALService } from './fin-seguimento-faturacao-anual.service';

describe('FINSEGUIMENTOFATURACAOANUALService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FINSEGUIMENTOFATURACAOANUALService]
    });
  });

  it('should be created', inject([FINSEGUIMENTOFATURACAOANUALService], (service: FINSEGUIMENTOFATURACAOANUALService) => {
    expect(service).toBeTruthy();
  }));
});
