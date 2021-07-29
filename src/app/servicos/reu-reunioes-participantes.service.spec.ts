import { TestBed, inject } from '@angular/core/testing';

import { REUREUNIOESPARTICIPANTESService } from './reu-reunioes-participantes.service';

describe('REUREUNIOESPARTICIPANTESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [REUREUNIOESPARTICIPANTESService]
    });
  });

  it('should be created', inject([REUREUNIOESPARTICIPANTESService], (service: REUREUNIOESPARTICIPANTESService) => {
    expect(service).toBeTruthy();
  }));
});
