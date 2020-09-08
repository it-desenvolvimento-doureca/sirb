import { TestBed, inject } from '@angular/core/testing';

import { RCDICCLASSIFICACAOService } from './rc-dic-classificacao.service';

describe('RCDICCLASSIFICACAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCDICCLASSIFICACAOService]
    });
  });

  it('should be created', inject([RCDICCLASSIFICACAOService], (service: RCDICCLASSIFICACAOService) => {
    expect(service).toBeTruthy();
  }));
});
