import { TestBed, inject } from '@angular/core/testing';

import { PAMOVCABService } from './pa-mov-cab.service';

describe('PAMOVCABService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PAMOVCABService]
    });
  });

  it('should be created', inject([PAMOVCABService], (service: PAMOVCABService) => {
    expect(service).toBeTruthy();
  }));
});
