import { TestBed } from '@angular/core/testing';

import { MANMOVMANUTENCAOCABService } from './man-mov-manutencao-cab.service';

describe('MANMOVMANUTENCAOCABService', () => {
  let service: MANMOVMANUTENCAOCABService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MANMOVMANUTENCAOCABService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
