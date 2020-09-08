import { TestBed, inject } from '@angular/core/testing';

import { PRDICOBJETIVOSPLANOSService } from './pr-dic-objetivos-planos.service';

describe('PRDICOBJETIVOSPLANOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICOBJETIVOSPLANOSService]
    });
  });

  it('should be created', inject([PRDICOBJETIVOSPLANOSService], (service: PRDICOBJETIVOSPLANOSService) => {
    expect(service).toBeTruthy();
  }));
});
