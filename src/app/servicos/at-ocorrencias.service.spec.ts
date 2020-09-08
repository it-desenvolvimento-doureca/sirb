import { TestBed, inject } from '@angular/core/testing';

import { ATOCORRENCIASService } from './at-ocorrencias.service';

describe('ATOCORRENCIASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ATOCORRENCIASService]
    });
  });

  it('should be created', inject([ATOCORRENCIASService], (service: ATOCORRENCIASService) => {
    expect(service).toBeTruthy();
  }));
});
