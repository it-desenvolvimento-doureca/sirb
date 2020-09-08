import { TestBed, inject } from '@angular/core/testing';

import { PRDICCAPACIDADEACABAMENTOService } from './pr-dic-capacidade-acabamento.service';

describe('PRDICCAPACIDADEACABAMENTOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICCAPACIDADEACABAMENTOService]
    });
  });

  it('should be created', inject([PRDICCAPACIDADEACABAMENTOService], (service: PRDICCAPACIDADEACABAMENTOService) => {
    expect(service).toBeTruthy();
  }));
});
