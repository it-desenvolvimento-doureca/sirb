import { TestBed, inject } from '@angular/core/testing';

import { QUADERROGACOESACOESService } from './qua-derrogacoes-acoes.service';

describe('QUADERROGACOESACOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QUADERROGACOESACOESService]
    });
  });

  it('should be created', inject([QUADERROGACOESACOESService], (service: QUADERROGACOESACOESService) => {
    expect(service).toBeTruthy();
  }));
});
