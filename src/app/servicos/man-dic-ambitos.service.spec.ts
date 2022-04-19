import { TestBed, inject } from '@angular/core/testing';

import { MANDICAMBITOSService } from './man-dic-ambitos.service';

describe('MANDICAMBITOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MANDICAMBITOSService]
    });
  });

  it('should be created', inject([MANDICAMBITOSService], (service: MANDICAMBITOSService) => {
    expect(service).toBeTruthy();
  }));
});
