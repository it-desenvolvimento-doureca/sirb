import { TestBed, inject } from '@angular/core/testing';

import { DASHBOARDANALISESService } from './dashboard-analises.service';

describe('DASHBOARDANALISESService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DASHBOARDANALISESService]
    });
  });

  it('should be created', inject([DASHBOARDANALISESService], (service: DASHBOARDANALISESService) => {
    expect(service).toBeTruthy();
  }));
});
