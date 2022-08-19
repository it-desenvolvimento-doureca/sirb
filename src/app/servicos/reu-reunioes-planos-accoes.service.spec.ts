import { TestBed, inject } from '@angular/core/testing';

import { REUREUNIOESPLANOSACCOESService } from './reu-reunioes-planos-accoes.service';

describe('REUREUNIOESPLANOSACCOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [REUREUNIOESPLANOSACCOESService]
    });
  });

  it('should be created', inject([REUREUNIOESPLANOSACCOESService], (service: REUREUNIOESPLANOSACCOESService) => {
    expect(service).toBeTruthy();
  }));
});
