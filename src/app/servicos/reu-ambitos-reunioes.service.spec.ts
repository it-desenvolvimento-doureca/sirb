import { TestBed, inject } from '@angular/core/testing';

import { REUAMBITOSREUNIOESService } from './reu-ambitos-reunioes.service';

describe('REUAMBITOSREUNIOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [REUAMBITOSREUNIOESService]
    });
  });

  it('should be created', inject([REUAMBITOSREUNIOESService], (service: REUAMBITOSREUNIOESService) => {
    expect(service).toBeTruthy();
  }));
});
