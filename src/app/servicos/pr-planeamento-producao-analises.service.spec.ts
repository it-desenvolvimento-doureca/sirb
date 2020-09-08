import { TestBed, inject } from '@angular/core/testing';

import { PRPLANEAMENTOPRODUCAOANALISESService } from './pr-planeamento-producao-analises.service';

describe('PRPLANEAMENTOPRODUCAOANALISESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRPLANEAMENTOPRODUCAOANALISESService]
    });
  });

  it('should be created', inject([PRPLANEAMENTOPRODUCAOANALISESService], (service: PRPLANEAMENTOPRODUCAOANALISESService) => {
    expect(service).toBeTruthy();
  }));
});
