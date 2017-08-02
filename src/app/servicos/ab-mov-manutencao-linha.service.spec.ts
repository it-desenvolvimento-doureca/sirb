import { TestBed, inject } from '@angular/core/testing';

import { ABMOVMANUTENCAOLINHAService } from './ab-mov-manutencao-linha.service';

describe('ABMOVMANUTENCAOLINHAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABMOVMANUTENCAOLINHAService]
    });
  });

  it('should be created', inject([ABMOVMANUTENCAOLINHAService], (service: ABMOVMANUTENCAOLINHAService) => {
    expect(service).toBeTruthy();
  }));
});
