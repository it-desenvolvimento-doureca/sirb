import { TestBed, inject } from '@angular/core/testing';

import { REUREUNIOESService } from './reu-reunioes.service';

describe('REUREUNIOESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [REUREUNIOESService]
    });
  });

  it('should be created', inject([REUREUNIOESService], (service: REUREUNIOESService) => {
    expect(service).toBeTruthy();
  }));
});
