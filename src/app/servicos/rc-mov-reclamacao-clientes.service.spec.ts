import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOCLIENTESService } from './rc-mov-reclamacao-clientes.service';

describe('RCMOVRECLAMACAOCLIENTESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOCLIENTESService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOCLIENTESService], (service: RCMOVRECLAMACAOCLIENTESService) => {
    expect(service).toBeTruthy();
  }));
});
