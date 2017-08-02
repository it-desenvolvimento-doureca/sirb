import { TestBed, inject } from '@angular/core/testing';

import { ABMOVANALISELINHAService } from './ab-mov-analise-linha.service';

describe('ABMOVANALISELINHAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABMOVANALISELINHAService]
    });
  });

  it('should be created', inject([ABMOVANALISELINHAService], (service: ABMOVANALISELINHAService) => {
    expect(service).toBeTruthy();
  }));
});
