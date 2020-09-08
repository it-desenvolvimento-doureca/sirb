import { TestBed, inject } from '@angular/core/testing';

import { PRDICSECTORESANALISEService } from './pr-dic-sectores-analise.service';

describe('PRDICSECTORESANALISEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICSECTORESANALISEService]
    });
  });

  it('should be created', inject([PRDICSECTORESANALISEService], (service: PRDICSECTORESANALISEService) => {
    expect(service).toBeTruthy();
  }));
});
