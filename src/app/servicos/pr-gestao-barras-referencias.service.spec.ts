import { TestBed, inject } from '@angular/core/testing';

import { PRGESTAOBARRASREFERENCIASService } from './pr-gestao-barras-referencias.service';

describe('PRGESTAOBARRASREFERENCIASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRGESTAOBARRASREFERENCIASService]
    });
  });

  it('should be created', inject([PRGESTAOBARRASREFERENCIASService], (service: PRGESTAOBARRASREFERENCIASService) => {
    expect(service).toBeTruthy();
  }));
});
