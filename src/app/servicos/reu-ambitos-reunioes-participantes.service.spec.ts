import { TestBed, inject } from '@angular/core/testing';

import { REUAMBITOSREUNIOESPARTICIPANTESService } from './reu-ambitos-reunioes-participantes.service';

describe('REUAMBITOSREUNIOESPARTICIPANTESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [REUAMBITOSREUNIOESPARTICIPANTESService]
    });
  });

  it('should be created', inject([REUAMBITOSREUNIOESPARTICIPANTESService], (service: REUAMBITOSREUNIOESPARTICIPANTESService) => {
    expect(service).toBeTruthy();
  }));
});
