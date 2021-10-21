import { TestBed, inject } from '@angular/core/testing';

import { MANMOVMANUTENCAOPLANOSService } from './man-mov-manutencao-planos.service';

describe('MANMOVMANUTENCAOPLANOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVMANUTENCAOPLANOSService]
    });
  });

  it('should be created', inject([MANMOVMANUTENCAOPLANOSService], (service: MANMOVMANUTENCAOPLANOSService) => {
    expect(service).toBeTruthy();
  }));
});
