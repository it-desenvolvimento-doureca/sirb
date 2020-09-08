import { TestBed, inject } from '@angular/core/testing';

import { PEDIDOSAPPService } from './pedidos-app.service';

describe('PEDIDOSAPPService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PEDIDOSAPPService]
    });
  });

  it('should be created', inject([PEDIDOSAPPService], (service: PEDIDOSAPPService) => {
    expect(service).toBeTruthy();
  }));
});
