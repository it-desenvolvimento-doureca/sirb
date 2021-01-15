import { TestBed, inject } from '@angular/core/testing';

import { RHDICSECTORESABSENTISMOService } from './rh-dic-sectores-absentismo.service';

describe('RHDICSECTORESABSENTISMOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHDICSECTORESABSENTISMOService]
    });
  });

  it('should be created', inject([RHDICSECTORESABSENTISMOService], (service: RHDICSECTORESABSENTISMOService) => {
    expect(service).toBeTruthy();
  }));
});
