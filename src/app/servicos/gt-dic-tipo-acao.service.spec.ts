import { TestBed, inject } from '@angular/core/testing';

import { GTDICTIPOACAOService } from './gt-dic-tipo-acao.service';

describe('GTDICTIPOACAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GTDICTIPOACAOService]
    });
  });

  it('should be created', inject([GTDICTIPOACAOService], (service: GTDICTIPOACAOService) => {
    expect(service).toBeTruthy();
  }));
});
