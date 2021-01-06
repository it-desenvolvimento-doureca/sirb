import { TestBed, inject } from '@angular/core/testing';

import { QUADERROGACOESService } from './qua-derrogacoes.service';

describe('QUADERROGACOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QUADERROGACOESService]
    });
  });

  it('should be created', inject([QUADERROGACOESService], (service: QUADERROGACOESService) => {
    expect(service).toBeTruthy();
  }));
});
