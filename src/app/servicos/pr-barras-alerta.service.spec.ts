import { TestBed, inject } from '@angular/core/testing';

import { PRBARRASALERTAService } from './pr-barras-alerta.service';

describe('PRBARRASALERTAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRBARRASALERTAService]
    });
  });

  it('should be created', inject([PRBARRASALERTAService], (service: PRBARRASALERTAService) => {
    expect(service).toBeTruthy();
  }));
});
