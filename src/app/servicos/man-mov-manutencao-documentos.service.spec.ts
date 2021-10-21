import { TestBed, inject } from '@angular/core/testing';

import { MANMOVMANUTENCAODOCUMENTOSService } from './man-mov-manutencao-documentos.service';

describe('MANMOVMANUTENCAODOCUMENTOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVMANUTENCAODOCUMENTOSService]
    });
  });

  it('should be created', inject([MANMOVMANUTENCAODOCUMENTOSService], (service: MANMOVMANUTENCAODOCUMENTOSService) => {
    expect(service).toBeTruthy();
  }));
});
