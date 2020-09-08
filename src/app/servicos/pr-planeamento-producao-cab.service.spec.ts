import { TestBed, inject } from '@angular/core/testing';

import { PRPLANEAMENTOPRODUCAOCABService } from './pr-planeamento-producao-cab.service';

describe('PRPLANEAMENTOPRODUCAOCABService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRPLANEAMENTOPRODUCAOCABService]
    });
  });

  it('should be created', inject([PRPLANEAMENTOPRODUCAOCABService], (service: PRPLANEAMENTOPRODUCAOCABService) => {
    expect(service).toBeTruthy();
  }));
});
