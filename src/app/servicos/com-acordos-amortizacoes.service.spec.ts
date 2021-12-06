import { TestBed, inject } from '@angular/core/testing';

import { COMACORDOSAMORTIZACOESService } from './com-acordos-amortizacoes.service';

describe('COMACORDOSAMORTIZACOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMACORDOSAMORTIZACOESService]
    });
  });

  it('should be created', inject([COMACORDOSAMORTIZACOESService], (service: COMACORDOSAMORTIZACOESService) => {
    expect(service).toBeTruthy();
  }));
});
