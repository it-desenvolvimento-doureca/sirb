import { TestBed, inject } from '@angular/core/testing';

import { COMACORDOSHISTORICOService } from './com-acordos-historico.service';

describe('COMACORDOSHISTORICOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMACORDOSHISTORICOService]
    });
  });

  it('should be created', inject([COMACORDOSHISTORICOService], (service: COMACORDOSHISTORICOService) => {
    expect(service).toBeTruthy();
  }));
});
