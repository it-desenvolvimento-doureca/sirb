import { TestBed, inject } from '@angular/core/testing';

import { PRGESTAOBARRASService } from './pr-gestao-barras.service';

describe('PRGESTAOBARRASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRGESTAOBARRASService]
    });
  });

  it('should be created', inject([PRGESTAOBARRASService], (service: PRGESTAOBARRASService) => {
    expect(service).toBeTruthy();
  }));
});
