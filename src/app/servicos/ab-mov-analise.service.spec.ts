import { TestBed, inject } from '@angular/core/testing';

import { ABMOVANALISEService } from './ab-mov-analise.service';

describe('ABMOVANALISEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABMOVANALISEService]
    });
  });

  it('should be created', inject([ABMOVANALISEService], (service: ABMOVANALISEService) => {
    expect(service).toBeTruthy();
  }));
});
