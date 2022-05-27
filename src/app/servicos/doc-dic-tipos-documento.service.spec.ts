import { TestBed, inject } from '@angular/core/testing';

import { DOCDICTIPOSDOCUMENTOService } from './doc-dic-tipos-documento.service';

describe('DOCDICTIPOSDOCUMENTOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DOCDICTIPOSDOCUMENTOService]
    });
  });

  it('should be created', inject([DOCDICTIPOSDOCUMENTOService], (service: DOCDICTIPOSDOCUMENTOService) => {
    expect(service).toBeTruthy();
  }));
});
