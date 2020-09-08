import { TestBed, inject } from '@angular/core/testing';

import { PRDICSEMANASANALISEService } from './pr-dic-semanas-analise.service';

describe('PRDICSEMANASANALISEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICSEMANASANALISEService]
    });
  });

  it('should be created', inject([PRDICSEMANASANALISEService], (service: PRDICSEMANASANALISEService) => {
    expect(service).toBeTruthy();
  }));
});
