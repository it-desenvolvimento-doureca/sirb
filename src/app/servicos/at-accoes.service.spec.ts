import { TestBed, inject } from '@angular/core/testing';

import { ATACCOESService } from './at-accoes.service';

describe('ATACCOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ATACCOESService]
    });
  });

  it('should be created', inject([ATACCOESService], (service: ATACCOESService) => {
    expect(service).toBeTruthy();
  }));
});
