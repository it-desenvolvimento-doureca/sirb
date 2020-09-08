import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOARTIGOSIMILARESService } from './rc-mov-reclamacao-artigo-similares.service';

describe('RCMOVRECLAMACAOARTIGOSIMILARESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOARTIGOSIMILARESService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOARTIGOSIMILARESService], (service: RCMOVRECLAMACAOARTIGOSIMILARESService) => {
    expect(service).toBeTruthy();
  }));
});
