import { TestBed, inject } from '@angular/core/testing';

import { MANMOVMANUTENCAOEQUIPAMENTOSService } from './man-mov-manutencao-equipamentos.service';

describe('MANMOVMANUTENCAOEQUIPAMENTOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVMANUTENCAOEQUIPAMENTOSService]
    });
  });

  it('should be created', inject([MANMOVMANUTENCAOEQUIPAMENTOSService], (service: MANMOVMANUTENCAOEQUIPAMENTOSService) => {
    expect(service).toBeTruthy();
  }));
});
