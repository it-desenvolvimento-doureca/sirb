import { TestBed, inject } from '@angular/core/testing';

import { ABMOVMANUTENCAODOSIFICADORESService } from './ab-mov-manutencao-dosificadores.service';

describe('ABMOVMANUTENCAODOSIFICADORESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABMOVMANUTENCAODOSIFICADORESService]
    });
  });

  it('should be created', inject([ABMOVMANUTENCAODOSIFICADORESService], (service: ABMOVMANUTENCAODOSIFICADORESService) => {
    expect(service).toBeTruthy();
  }));
});
