import { TestBed, inject } from '@angular/core/testing';

import { ABDICDOSIFICACAOService } from './ab-dic-dosificacao.service';

describe('ABDICDOSIFICACAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICDOSIFICACAOService]
    });
  });

  it('should be created', inject([ABDICDOSIFICACAOService], (service: ABDICDOSIFICACAOService) => {
    expect(service).toBeTruthy();
  }));
});
