import { TestBed, inject } from '@angular/core/testing';

import { RCDICTIPORECLAMACAOService } from './rc-dic-tipo-reclamacao.service';

describe('RCDICTIPORECLAMACAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCDICTIPORECLAMACAOService]
    });
  });

  it('should be created', inject([RCDICTIPORECLAMACAOService], (service: RCDICTIPORECLAMACAOService) => {
    expect(service).toBeTruthy();
  }));
});
