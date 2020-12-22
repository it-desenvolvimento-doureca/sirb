import { TestBed, inject } from '@angular/core/testing';

import { QUAMOVAUDITORIASService } from './qua-mov-auditorias.service';

describe('QUAMOVAUDITORIASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QUAMOVAUDITORIASService]
    });
  });

  it('should be created', inject([QUAMOVAUDITORIASService], (service: QUAMOVAUDITORIASService) => {
    expect(service).toBeTruthy();
  }));
});
