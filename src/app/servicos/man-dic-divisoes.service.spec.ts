import { TestBed, inject } from '@angular/core/testing';

import { MANDICDIVISOESService } from './man-dic-divisoes.service';

describe('MANDICDIVISOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANDICDIVISOESService]
    });
  });

  it('should be created', inject([MANDICDIVISOESService], (service: MANDICDIVISOESService) => {
    expect(service).toBeTruthy();
  }));
});
