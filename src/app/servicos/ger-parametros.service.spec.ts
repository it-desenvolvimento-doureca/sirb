import { TestBed, inject } from '@angular/core/testing';

import { GERPARAMETROSService } from './ger-parametros.service';

describe('GERPARAMETROSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERPARAMETROSService]
    });
  });

  it('should be created', inject([GERPARAMETROSService], (service: GERPARAMETROSService) => {
    expect(service).toBeTruthy();
  }));
});
