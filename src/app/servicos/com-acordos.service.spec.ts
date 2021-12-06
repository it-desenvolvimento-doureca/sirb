import { TestBed, inject } from '@angular/core/testing';

import { COMACORDOSService } from './com-acordos.service';

describe('COMACORDOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMACORDOSService]
    });
  });

  it('should be created', inject([COMACORDOSService], (service: COMACORDOSService) => {
    expect(service).toBeTruthy();
  }));
});
