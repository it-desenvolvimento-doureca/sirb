import { TestBed, inject } from '@angular/core/testing';

import { ATENTREVISTASService } from './at-entrevistas.service';

describe('ATENTREVISTASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ATENTREVISTASService]
    });
  });

  it('should be created', inject([ATENTREVISTASService], (service: ATENTREVISTASService) => {
    expect(service).toBeTruthy();
  }));
});
