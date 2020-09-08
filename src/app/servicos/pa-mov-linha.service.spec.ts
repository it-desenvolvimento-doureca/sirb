import { TestBed, inject } from '@angular/core/testing';

import { PAMOVLINHAService } from './pa-mov-linha.service';

describe('PAMOVLINHAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PAMOVLINHAService]
    });
  });

  it('should be created', inject([PAMOVLINHAService], (service: PAMOVLINHAService) => {
    expect(service).toBeTruthy();
  }));
});
