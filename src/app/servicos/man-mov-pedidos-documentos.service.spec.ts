import { TestBed, inject } from '@angular/core/testing';

import { MANMOVPEDIDOSDOCUMENTOSService } from './man-mov-pedidos-documentos.service';

describe('MANMOVPEDIDOSDOCUMENTOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANMOVPEDIDOSDOCUMENTOSService]
    });
  });

  it('should be created', inject([MANMOVPEDIDOSDOCUMENTOSService], (service: MANMOVPEDIDOSDOCUMENTOSService) => {
    expect(service).toBeTruthy();
  }));
});
