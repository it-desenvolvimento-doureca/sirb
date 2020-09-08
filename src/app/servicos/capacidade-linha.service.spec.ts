import { TestBed, inject } from '@angular/core/testing';

import { CAPACIDADELINHAService } from './capacidade-linha.service';

describe('CAPACIDADELINHAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CAPACIDADELINHAService]
    });
  });

  it('should be created', inject([CAPACIDADELINHAService], (service: CAPACIDADELINHAService) => {
    expect(service).toBeTruthy();
  }));
});
