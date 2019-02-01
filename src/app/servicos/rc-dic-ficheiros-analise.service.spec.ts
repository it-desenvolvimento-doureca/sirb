import { TestBed, inject } from '@angular/core/testing';

import { RCDICFICHEIROSANALISEService } from './rc-dic-ficheiros-analise.service';

describe('RCDICFICHEIROSANALISEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCDICFICHEIROSANALISEService]
    });
  });

  it('should be created', inject([RCDICFICHEIROSANALISEService], (service: RCDICFICHEIROSANALISEService) => {
    expect(service).toBeTruthy();
  }));
});
