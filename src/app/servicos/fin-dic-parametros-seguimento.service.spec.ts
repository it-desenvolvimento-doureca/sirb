import { TestBed, inject } from '@angular/core/testing';

import { FINDICPARAMETROSSEGUIMENTOService } from './fin-dic-parametros-seguimento.service';

describe('FINDICPARAMETROSSEGUIMENTOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FINDICPARAMETROSSEGUIMENTOService]
    });
  });

  it('should be created', inject([FINDICPARAMETROSSEGUIMENTOService], (service: FINDICPARAMETROSSEGUIMENTOService) => {
    expect(service).toBeTruthy();
  }));
});
