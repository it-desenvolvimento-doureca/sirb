import { TestBed, inject } from '@angular/core/testing';

import { MANMOVMANUTENCAONOTASService } from './man-mov-manutencao-notas.service';

describe('MANMOVMANUTENCAONOTASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVMANUTENCAONOTASService]
    });
  });

  it('should be created', inject([MANMOVMANUTENCAONOTASService], (service: MANMOVMANUTENCAONOTASService) => {
    expect(service).toBeTruthy();
  }));
});
