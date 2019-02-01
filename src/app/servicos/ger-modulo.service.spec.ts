import { TestBed, inject } from '@angular/core/testing';

import { GERMODULOService } from './ger-modulo.service';

describe('GERMODULOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERMODULOService]
    });
  });

  it('should be created', inject([GERMODULOService], (service: GERMODULOService) => {
    expect(service).toBeTruthy();
  }));
});
