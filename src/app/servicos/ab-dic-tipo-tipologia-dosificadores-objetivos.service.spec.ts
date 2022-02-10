import { TestBed, inject } from '@angular/core/testing';

import { ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService } from './ab-dic-tipo-tipologia-dosificadores-objetivos.service';

describe('ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService]
    });
  });

  it('should be created', inject([ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService], (service: ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService) => {
    expect(service).toBeTruthy();
  }));
});
