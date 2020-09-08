import { TestBed, inject } from '@angular/core/testing';

import { PRDICSECTORESAGREGADORESService } from './pr-dic-sectores-agregadores.service';

describe('PRDICSECTORESAGREGADORESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICSECTORESAGREGADORESService]
    });
  });

  it('should be created', inject([PRDICSECTORESAGREGADORESService], (service: PRDICSECTORESAGREGADORESService) => {
    expect(service).toBeTruthy();
  }));
});
