import { TestBed, inject } from '@angular/core/testing';

import { COMACORDOSLTAService } from './com-acordos-lta.service';

describe('COMACORDOSLTAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMACORDOSLTAService]
    });
  });

  it('should be created', inject([COMACORDOSLTAService], (service: COMACORDOSLTAService) => {
    expect(service).toBeTruthy();
  }));
});
