import { TestBed, inject } from '@angular/core/testing';

import { RCDICTIPODEFEITOService } from './rc-dic-tipo-defeito.service';

describe('RCDICTIPODEFEITOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCDICTIPODEFEITOService]
    });
  });

  it('should be created', inject([RCDICTIPODEFEITOService], (service: RCDICTIPODEFEITOService) => {
    expect(service).toBeTruthy();
  }));
});
