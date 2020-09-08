import { TestBed, inject } from '@angular/core/testing';

import { PRDICPRODUCAOSEMANAService } from './pr-dic-producao-semana.service';

describe('PRDICPRODUCAOSEMANAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICPRODUCAOSEMANAService]
    });
  });

  it('should be created', inject([PRDICPRODUCAOSEMANAService], (service: PRDICPRODUCAOSEMANAService) => {
    expect(service).toBeTruthy();
  }));
});
