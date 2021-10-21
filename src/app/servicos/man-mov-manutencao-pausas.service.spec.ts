import { TestBed } from '@angular/core/testing';

import { MANMOVMANUTENCAOPAUSASService } from './man-mov-manutencao-pausas.service';

describe('MANMOVMANUTENCAOPAUSASService', () => {
  let service: MANMOVMANUTENCAOPAUSASService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MANMOVMANUTENCAOPAUSASService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
