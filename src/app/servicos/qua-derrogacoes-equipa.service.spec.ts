import { TestBed, inject } from '@angular/core/testing';

import { QUADERROGACOESEQUIPAService } from './qua-derrogacoes-equipa.service';

describe('QUADERROGACOESEQUIPAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QUADERROGACOESEQUIPAService]
    });
  });

  it('should be created', inject([QUADERROGACOESEQUIPAService], (service: QUADERROGACOESEQUIPAService) => {
    expect(service).toBeTruthy();
  }));
});
