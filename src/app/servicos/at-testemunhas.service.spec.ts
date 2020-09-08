import { TestBed, inject } from '@angular/core/testing';

import { ATTESTEMUNHASService } from './at-testemunhas.service';

describe('ATTESTEMUNHASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ATTESTEMUNHASService]
    });
  });

  it('should be created', inject([ATTESTEMUNHASService], (service: ATTESTEMUNHASService) => {
    expect(service).toBeTruthy();
  }));
});
