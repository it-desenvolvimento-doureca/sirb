import { TestBed, inject } from '@angular/core/testing';

import { PAMOVFICHEIROSService } from './pa-mov-ficheiros.service';

describe('PAMOVFICHEIROSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PAMOVFICHEIROSService]
    });
  });

  it('should be created', inject([PAMOVFICHEIROSService], (service: PAMOVFICHEIROSService) => {
    expect(service).toBeTruthy();
  }));
});
