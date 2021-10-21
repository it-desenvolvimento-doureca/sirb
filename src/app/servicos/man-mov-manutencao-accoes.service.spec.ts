import { TestBed } from '@angular/core/testing';

import { MANMOVMANUTENCAOACCOESService } from './man-mov-manutencao-accoes.service';

describe('MANMOVMANUTENCAOACCOESService', () => {
  let service: MANMOVMANUTENCAOACCOESService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MANMOVMANUTENCAOACCOESService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
