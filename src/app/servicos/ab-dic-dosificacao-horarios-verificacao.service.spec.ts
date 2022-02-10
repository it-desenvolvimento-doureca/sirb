import { TestBed, inject } from '@angular/core/testing';

import { ABDICDOSIFICACAOHORARIOSVERIFICACAOService } from './ab-dic-dosificacao-horarios-verificacao.service';

describe('ABDICDOSIFICACAOHORARIOSVERIFICACAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICDOSIFICACAOHORARIOSVERIFICACAOService]
    });
  });

  it('should be created', inject([ABDICDOSIFICACAOHORARIOSVERIFICACAOService], (service: ABDICDOSIFICACAOHORARIOSVERIFICACAOService) => {
    expect(service).toBeTruthy();
  }));
});
