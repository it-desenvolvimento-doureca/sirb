import { TestBed, inject } from '@angular/core/testing';

import { RCDICTEMPORESPOSTAService } from './rc-dic-tempo-resposta.service';

describe('RCDICTEMPORESPOSTAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCDICTEMPORESPOSTAService]
    });
  });

  it('should be created', inject([RCDICTEMPORESPOSTAService], (service: RCDICTEMPORESPOSTAService) => {
    expect(service).toBeTruthy();
  }));
});
