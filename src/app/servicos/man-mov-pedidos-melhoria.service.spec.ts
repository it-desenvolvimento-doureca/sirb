import { TestBed, inject } from '@angular/core/testing';

import { MANMOVPEDIDOSMELHORIAService } from './man-mov-pedidos-melhoria.service';

describe('MANMOVPEDIDOSMELHORIAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVPEDIDOSMELHORIAService]
    });
  });

  it('should be created', inject([MANMOVPEDIDOSMELHORIAService], (service: MANMOVPEDIDOSMELHORIAService) => {
    expect(service).toBeTruthy();
  }));
});
