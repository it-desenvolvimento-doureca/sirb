import { TestBed, inject } from '@angular/core/testing';

import { RHTURNOSService } from './rh-turnos.service';

describe('RHTURNOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RHTURNOSService]
    });
  });

  it('should be created', inject([RHTURNOSService], (service: RHTURNOSService) => {
    expect(service).toBeTruthy();
  }));
});
