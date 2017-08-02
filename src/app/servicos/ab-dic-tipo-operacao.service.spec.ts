import { TestBed, inject } from '@angular/core/testing';

import { ABDICTIPOOPERACAOService } from './ab-dic-tipo-operacao.service';

describe('ABDICTIPOOPERACAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICTIPOOPERACAOService]
    });
  });

  it('should be created', inject([ABDICTIPOOPERACAOService], (service: ABDICTIPOOPERACAOService) => {
    expect(service).toBeTruthy();
  }));
});
