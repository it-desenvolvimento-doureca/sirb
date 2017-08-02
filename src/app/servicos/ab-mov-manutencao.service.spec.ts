import { TestBed, inject } from '@angular/core/testing';

import { ABMOVMANUTENCAOService } from './ab-mov-manutencao.service';

describe('ABMOVMANUTENCAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABMOVMANUTENCAOService]
    });
  });

  it('should be created', inject([ABMOVMANUTENCAOService], (service: ABMOVMANUTENCAOService) => {
    expect(service).toBeTruthy();
  }));
});
