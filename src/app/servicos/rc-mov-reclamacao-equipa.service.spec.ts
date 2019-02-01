import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOEQUIPAService } from './rc-mov-reclamacao-equipa.service';

describe('RCMOVRECLAMACAOEQUIPAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOEQUIPAService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOEQUIPAService], (service: RCMOVRECLAMACAOEQUIPAService) => {
    expect(service).toBeTruthy();
  }));
});
