import { TestBed, inject } from '@angular/core/testing';

import { RCDICACCOESRECLAMACAOService } from './rc-dic-accoes-reclamacao.service';

describe('ABDICACCOESRECLAMACAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCDICACCOESRECLAMACAOService]
    });
  });

  it('should be created', inject([RCDICACCOESRECLAMACAOService], (service: RCDICACCOESRECLAMACAOService) => {
    expect(service).toBeTruthy();
  }));
});
