import { TestBed, inject } from '@angular/core/testing';

import { DOCDICPOSTOSService } from './doc-dic-postos.service';

describe('DOCDICPOSTOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DOCDICPOSTOSService]
    });
  });

  it('should be created', inject([DOCDICPOSTOSService], (service: DOCDICPOSTOSService) => {
    expect(service).toBeTruthy();
  }));
});
