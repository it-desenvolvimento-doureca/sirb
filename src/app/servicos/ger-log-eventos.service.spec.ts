import { TestBed, inject } from '@angular/core/testing';

import { GERLOGEVENTOSService } from './ger-log-eventos.service';

describe('GERLOGEVENTOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERLOGEVENTOSService]
    });
  });

  it('should be created', inject([GERLOGEVENTOSService], (service: GERLOGEVENTOSService) => {
    expect(service).toBeTruthy();
  }));
});
