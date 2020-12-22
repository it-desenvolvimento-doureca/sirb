import { TestBed, inject } from '@angular/core/testing';

import { QUADICTIPOSAUDITORIAQTDPREVISTAService } from './qua-dic-tipos-auditoria-qtd-prevista.service';

describe('QUADICTIPOSAUDITORIAQTDPREVISTAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QUADICTIPOSAUDITORIAQTDPREVISTAService]
    });
  });

  it('should be created', inject([QUADICTIPOSAUDITORIAQTDPREVISTAService], (service: QUADICTIPOSAUDITORIAQTDPREVISTAService) => {
    expect(service).toBeTruthy();
  }));
});
