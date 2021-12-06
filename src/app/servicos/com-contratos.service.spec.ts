import { TestBed, inject } from '@angular/core/testing';

import { COMCONTRATOSService } from './com-contratos.service';

describe('COMCONTRATOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [COMCONTRATOSService]
    });
  });

  it('should be created', inject([COMCONTRATOSService], (service: COMCONTRATOSService) => {
    expect(service).toBeTruthy();
  }));
});
