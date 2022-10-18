import { TestBed, inject } from '@angular/core/testing';

import { ATENTREVISTASRESPONSAVELService } from './at-entrevistas-responsavel.service';

describe('ATENTREVISTASRESPONSAVELService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ATENTREVISTASRESPONSAVELService]
    });
  });

  it('should be created', inject([ATENTREVISTASRESPONSAVELService], (service: ATENTREVISTASRESPONSAVELService) => {
    expect(service).toBeTruthy();
  }));
});
