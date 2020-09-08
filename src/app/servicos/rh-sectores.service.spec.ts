import { TestBed, inject } from '@angular/core/testing';

import { RHSECTORESService } from './rh-sectores.service';

describe('RHSECTORESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHSECTORESService]
    });
  });

  it('should be created', inject([RHSECTORESService], (service: RHSECTORESService) => {
    expect(service).toBeTruthy();
  }));
});
