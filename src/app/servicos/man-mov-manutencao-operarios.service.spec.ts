import { TestBed } from '@angular/core/testing';

import { MANMOVMANUTENCAOOPERARIOSService } from './man-mov-manutencao-operarios.service';

describe('MANMOVMANUTENCAOOPERARIOSService', () => {
  let service: MANMOVMANUTENCAOOPERARIOSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MANMOVMANUTENCAOOPERARIOSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
