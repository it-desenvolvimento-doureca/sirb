import { TestBed, inject } from '@angular/core/testing';

import { ABMOVMANUTENCAOCABService } from './ab-mov-manutencao-cab.service';

describe('ABMOVMANUTENCAOCABService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABMOVMANUTENCAOCABService]
    });
  });

  it('should be created', inject([ABMOVMANUTENCAOCABService], (service: ABMOVMANUTENCAOCABService) => {
    expect(service).toBeTruthy();
  }));
});
