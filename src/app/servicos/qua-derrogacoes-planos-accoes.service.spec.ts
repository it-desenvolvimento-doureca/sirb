import { TestBed, inject } from '@angular/core/testing';

import { QUADERROGACOESPLANOSACCOESService } from './qua-derrogacoes-planos-accoes.service';

describe('QUADERROGACOESPLANOSACCOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QUADERROGACOESPLANOSACCOESService]
    });
  });

  it('should be created', inject([QUADERROGACOESPLANOSACCOESService], (service: QUADERROGACOESPLANOSACCOESService) => {
    expect(service).toBeTruthy();
  }));
});
