import { TestBed, inject } from '@angular/core/testing';

import { DOCFICHADOCUMENTOSService } from './doc-ficha-documentos.service';

describe('DOCFICHADOCUMENTOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DOCFICHADOCUMENTOSService]
    });
  });

  it('should be created', inject([DOCFICHADOCUMENTOSService], (service: DOCFICHADOCUMENTOSService) => {
    expect(service).toBeTruthy();
  }));
});
