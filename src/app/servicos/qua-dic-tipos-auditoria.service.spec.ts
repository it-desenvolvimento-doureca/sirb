import { TestBed, inject } from '@angular/core/testing';

import { QUADICTIPOSAUDITORIAService } from './qua-dic-tipos-auditoria.service';

describe('QUADICTIPOSAUDITORIAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QUADICTIPOSAUDITORIAService]
    });
  });

  it('should be created', inject([QUADICTIPOSAUDITORIAService], (service: QUADICTIPOSAUDITORIAService) => {
    expect(service).toBeTruthy();
  }));
});
