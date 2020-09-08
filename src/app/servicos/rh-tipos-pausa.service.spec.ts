import { TestBed, inject } from '@angular/core/testing';

import { RHTIPOSPAUSAService } from './rh-tipos-pausa.service';

describe('RHTIPOSPAUSAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHTIPOSPAUSAService]
    });
  });

  it('should be created', inject([RHTIPOSPAUSAService], (service: RHTIPOSPAUSAService) => {
    expect(service).toBeTruthy();
  }));
});
