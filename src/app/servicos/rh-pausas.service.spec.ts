import { TestBed, inject } from '@angular/core/testing';

import { RHPAUSASService } from './rh-pausas.service';

describe('RHPAUSASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHPAUSASService]
    });
  });

  it('should be created', inject([RHPAUSASService], (service: RHPAUSASService) => {
    expect(service).toBeTruthy();
  }));
});
