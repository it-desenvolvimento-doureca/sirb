import { TestBed, inject } from '@angular/core/testing';

import { FICHEIROSPAGINASService } from './ficheiros-paginas.service';

describe('FICHEIROSPAGINASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FICHEIROSPAGINASService]
    });
  });

  it('should be created', inject([FICHEIROSPAGINASService], (service: FICHEIROSPAGINASService) => {
    expect(service).toBeTruthy();
  }));
});
