import { TestBed, inject } from '@angular/core/testing';

import { ATDICCAUSASACIDENTEService } from './at-dic-causas-acidente.service';

describe('ATDICCAUSASACIDENTEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ATDICCAUSASACIDENTEService]
    });
  });

  it('should be created', inject([ATDICCAUSASACIDENTEService], (service: ATDICCAUSASACIDENTEService) => {
    expect(service).toBeTruthy();
  }));
});
