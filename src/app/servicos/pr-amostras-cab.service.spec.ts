import { TestBed, inject } from '@angular/core/testing';

import { PRAMOSTRASCABService } from './pr-amostras-cab.service';

describe('PRAMOSTRASCABService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRAMOSTRASCABService]
    });
  });

  it('should be created', inject([PRAMOSTRASCABService], (service: PRAMOSTRASCABService) => {
    expect(service).toBeTruthy();
  }));
});
