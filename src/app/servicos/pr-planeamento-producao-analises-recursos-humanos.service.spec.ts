import { TestBed, inject } from '@angular/core/testing';

import { PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService } from './pr-planeamento-producao-analises-recursos-humanos.service';

describe('PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService]
    });
  });

  it('should be created', inject([PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService], (service: PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService) => {
    expect(service).toBeTruthy();
  }));
});
