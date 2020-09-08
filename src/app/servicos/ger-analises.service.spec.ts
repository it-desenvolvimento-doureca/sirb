import { TestBed, inject } from '@angular/core/testing';

import { GERANALISESService } from './ger-analises.service';

describe('GERANALISESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERANALISESService]
    });
  });

  it('should be created', inject([GERANALISESService], (service: GERANALISESService) => {
    expect(service).toBeTruthy();
  }));
});
