import { TestBed, inject } from '@angular/core/testing';

import { MANMOVMANUTENCAODADOSCOMPRAService } from './man-mov-manutencao-dados-compra.service';

describe('MANMOVMANUTENCAODADOSCOMPRAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVMANUTENCAODADOSCOMPRAService]
    });
  });

  it('should be created', inject([MANMOVMANUTENCAODADOSCOMPRAService], (service: MANMOVMANUTENCAODADOSCOMPRAService) => {
    expect(service).toBeTruthy();
  }));
});
