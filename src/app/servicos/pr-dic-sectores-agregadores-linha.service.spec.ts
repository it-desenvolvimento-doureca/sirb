import { TestBed, inject } from '@angular/core/testing';

import { PRDICSECTORESAGREGADORESLINHAService } from './pr-dic-sectores-agregadores-linha.service';

describe('PRDICSECTORESAGREGADORESLINHAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICSECTORESAGREGADORESLINHAService]
    });
  });

  it('should be created', inject([PRDICSECTORESAGREGADORESLINHAService], (service: PRDICSECTORESAGREGADORESLINHAService) => {
    expect(service).toBeTruthy();
  }));
});
