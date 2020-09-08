import { TestBed, inject } from '@angular/core/testing';

import { PRDICVALIDACAOBASTIDORService } from './pr-dic-validacao-bastidor.service';

describe('PRDICVALIDACAOBASTIDORService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRDICVALIDACAOBASTIDORService]
    });
  });

  it('should be created', inject([PRDICVALIDACAOBASTIDORService], (service: PRDICVALIDACAOBASTIDORService) => {
    expect(service).toBeTruthy();
  }));
});
