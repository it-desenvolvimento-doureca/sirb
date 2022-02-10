import { TestBed, inject } from '@angular/core/testing';

import { ABDICTIPOTIPOLOGIADOSIFICADORESService } from './ab-dic-tipo-tipologia-dosificadores.service';

describe('ABDICTIPOTIPOLOGIADOSIFICADORESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICTIPOTIPOLOGIADOSIFICADORESService]
    });
  });

  it('should be created', inject([ABDICTIPOTIPOLOGIADOSIFICADORESService], (service: ABDICTIPOTIPOLOGIADOSIFICADORESService) => {
    expect(service).toBeTruthy();
  }));
});
