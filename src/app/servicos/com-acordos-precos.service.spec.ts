import { TestBed, inject } from '@angular/core/testing';

import { COMACORDOSPRECOSService } from './com-acordos-precos.service';

describe('COMACORDOSPRECOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMACORDOSPRECOSService]
    });
  });

  it('should be created', inject([COMACORDOSPRECOSService], (service: COMACORDOSPRECOSService) => {
    expect(service).toBeTruthy();
  }));
});
