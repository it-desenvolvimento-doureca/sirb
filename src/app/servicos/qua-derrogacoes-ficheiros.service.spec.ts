import { TestBed, inject } from '@angular/core/testing';

import { QUADERROGACOESFICHEIROSService } from './qua-derrogacoes-ficheiros.service';

describe('QUADERROGACOESFICHEIROSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QUADERROGACOESFICHEIROSService]
    });
  });

  it('should be created', inject([QUADERROGACOESFICHEIROSService], (service: QUADERROGACOESFICHEIROSService) => {
    expect(service).toBeTruthy();
  }));
});
