import { TestBed, inject } from '@angular/core/testing';

import { MANMOVMANUTENCAOANEXOSService } from './man-mov-manutencao-anexos.service';

describe('MANMOVMANUTENCAOANEXOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVMANUTENCAOANEXOSService]
    });
  });

  it('should be created', inject([MANMOVMANUTENCAOANEXOSService], (service: MANMOVMANUTENCAOANEXOSService) => {
    expect(service).toBeTruthy();
  }));
});
