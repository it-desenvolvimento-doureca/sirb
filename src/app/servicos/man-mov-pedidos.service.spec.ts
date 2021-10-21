import { TestBed, inject } from '@angular/core/testing';

import { MANMOVPEDIDOSService } from './man-mov-pedidos.service';

describe('MANMOVPEDIDOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVPEDIDOSService]
    });
  });

  it('should be created', inject([MANMOVPEDIDOSService], (service: MANMOVPEDIDOSService) => {
    expect(service).toBeTruthy();
  }));
});
