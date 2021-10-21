import { TestBed, inject } from '@angular/core/testing';

import { MANMOVMANUTENCAOGRAUSIMPORTANCIAService } from './man-mov-manutencao-graus-importancia.service';

describe('MANMOVMANUTENCAOGRAUSIMPORTANCIAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVMANUTENCAOGRAUSIMPORTANCIAService]
    });
  });

  it('should be created', inject([MANMOVMANUTENCAOGRAUSIMPORTANCIAService], (service: MANMOVMANUTENCAOGRAUSIMPORTANCIAService) => {
    expect(service).toBeTruthy();
  }));
});
