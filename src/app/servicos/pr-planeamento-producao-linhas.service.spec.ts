import { TestBed, inject } from '@angular/core/testing';

import { PRPLANEAMENTOPRODUCAOLINHASService } from './pr-planeamento-producao-linhas.service';

describe('PRPLANEAMENTOPRODUCAOLINHASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRPLANEAMENTOPRODUCAOLINHASService]
    });
  });

  it('should be created', inject([PRPLANEAMENTOPRODUCAOLINHASService], (service: PRPLANEAMENTOPRODUCAOLINHASService) => {
    expect(service).toBeTruthy();
  }));
});
