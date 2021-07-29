import { TestBed, inject } from '@angular/core/testing';

import { REUREUNIOESFICHEIROSService } from './reu-reunioes-ficheiros.service';

describe('REUREUNIOESFICHEIROSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [REUREUNIOESFICHEIROSService]
    });
  });

  it('should be created', inject([REUREUNIOESFICHEIROSService], (service: REUREUNIOESFICHEIROSService) => {
    expect(service).toBeTruthy();
  }));
});
