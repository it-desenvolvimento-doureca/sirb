import { TestBed, inject } from '@angular/core/testing';

import { GEREVENTOSPROGRAMADOSService } from './ger-eventos-programados.service';

describe('GEREVENTOSPROGRAMADOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GEREVENTOSPROGRAMADOSService]
    });
  });

  it('should be created', inject([GEREVENTOSPROGRAMADOSService], (service: GEREVENTOSPROGRAMADOSService) => {
    expect(service).toBeTruthy();
  }));
});
