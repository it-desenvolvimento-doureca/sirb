import { TestBed, inject } from '@angular/core/testing';

import { ABDICTIPOMANUTENCAOService } from './ab-dic-tipo-manutencao.service';

describe('ABDICTIPOMANUTENCAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICTIPOMANUTENCAOService]
    });
  });

  it('should be created', inject([ABDICTIPOMANUTENCAOService], (service: ABDICTIPOMANUTENCAOService) => {
    expect(service).toBeTruthy();
  }));
});
