import { TestBed, inject } from '@angular/core/testing';

import { PRAMOSTRASACCOESService } from './pr-amostras-accoes.service';

describe('PRAMOSTRASACCOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRAMOSTRASACCOESService]
    });
  });

  it('should be created', inject([PRAMOSTRASACCOESService], (service: PRAMOSTRASACCOESService) => {
    expect(service).toBeTruthy();
  }));
});
