import { TestBed, inject } from '@angular/core/testing';

import { RHDICSECTORESABSENTISMOLINHAService } from './rh-dic-sectores-absentismo-linha.service';

describe('RHDICSECTORESABSENTISMOLINHAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHDICSECTORESABSENTISMOLINHAService]
    });
  });

  it('should be created', inject([RHDICSECTORESABSENTISMOLINHAService], (service: RHDICSECTORESABSENTISMOLINHAService) => {
    expect(service).toBeTruthy();
  }));
});
