import { TestBed, inject } from '@angular/core/testing';

import { COMACORDOSANEXOSService } from './com-acordos-anexos.service';

describe('COMACORDOSANEXOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMACORDOSANEXOSService]
    });
  });

  it('should be created', inject([COMACORDOSANEXOSService], (service: COMACORDOSANEXOSService) => {
    expect(service).toBeTruthy();
  }));
});
