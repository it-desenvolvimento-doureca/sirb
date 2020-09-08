import { TestBed, inject } from '@angular/core/testing';

import { RHDICTIPOCACIFOService } from './rh-dic-tipo-cacifo.service';

describe('RHDICTIPOCACIFOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHDICTIPOCACIFOService]
    });
  });

  it('should be created', inject([RHDICTIPOCACIFOService], (service: RHDICTIPOCACIFOService) => {
    expect(service).toBeTruthy();
  }));
});
