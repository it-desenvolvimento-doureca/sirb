import { TestBed, inject } from '@angular/core/testing';

import { GERCAMPOSDISPService } from './ger-campos-disp.service';

describe('GERCAMPOSDISPService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERCAMPOSDISPService]
    });
  });

  it('should be created', inject([GERCAMPOSDISPService], (service: GERCAMPOSDISPService) => {
    expect(service).toBeTruthy();
  }));
});
