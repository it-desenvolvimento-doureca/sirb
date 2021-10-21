import { TestBed } from '@angular/core/testing';

import { MANMOVMANUTENCAOLISTAMATERIALService } from './man-mov-manutencao-lista-material.service';

describe('MANMOVMANUTENCAOLISTAMATERIALService', () => {
  let service: MANMOVMANUTENCAOLISTAMATERIALService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MANMOVMANUTENCAOLISTAMATERIALService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
