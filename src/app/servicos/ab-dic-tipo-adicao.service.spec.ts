import { TestBed, inject } from '@angular/core/testing';

import { ABDICTIPOADICAOService } from './ab-dic-tipo-adicao.service';

describe('ABDICTIPOADICAOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABDICTIPOADICAOService]
    });
  });

  it('should be created', inject([ABDICTIPOADICAOService], (service: ABDICTIPOADICAOService) => {
    expect(service).toBeTruthy();
  }));
});
