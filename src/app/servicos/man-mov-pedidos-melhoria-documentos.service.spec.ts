import { TestBed, inject } from '@angular/core/testing';

import { MANMOVPEDIDOSMELHORIADOCUMENTOSService } from './man-mov-pedidos-melhoria-documentos.service';

describe('MANMOVPEDIDOSMELHORIADOCUMENTOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVPEDIDOSMELHORIADOCUMENTOSService]
    });
  });

  it('should be created', inject([MANMOVPEDIDOSMELHORIADOCUMENTOSService], (service: MANMOVPEDIDOSMELHORIADOCUMENTOSService) => {
    expect(service).toBeTruthy();
  }));
});
