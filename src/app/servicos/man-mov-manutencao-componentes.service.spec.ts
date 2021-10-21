import { TestBed, inject } from '@angular/core/testing';

import { MANMOVMANUTENCAOCOMPONENTESService } from './man-mov-manutencao-componentes.service';

describe('MANMOVMANUTENCAOCOMPONENTESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVMANUTENCAOCOMPONENTESService]
    });
  });

  it('should be created', inject([MANMOVMANUTENCAOCOMPONENTESService], (service: MANMOVMANUTENCAOCOMPONENTESService) => {
    expect(service).toBeTruthy();
  }));
});
