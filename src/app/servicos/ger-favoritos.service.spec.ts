import { TestBed, inject } from '@angular/core/testing';

import { GERFAVORITOSService } from './ger-favoritos.service';

describe('GERFAVORITOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERFAVORITOSService]
    });
  });

  it('should be created', inject([GERFAVORITOSService], (service: GERFAVORITOSService) => {
    expect(service).toBeTruthy();
  }));
});
