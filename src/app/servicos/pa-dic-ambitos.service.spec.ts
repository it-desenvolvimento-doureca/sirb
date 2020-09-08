import { TestBed, inject } from '@angular/core/testing';

import { PADICAMBITOSService } from './pa-dic-ambitos.service';

describe('PADICAMBITOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PADICAMBITOSService]
    });
  });

  it('should be created', inject([PADICAMBITOSService], (service: PADICAMBITOSService) => {
    expect(service).toBeTruthy();
  }));
});
