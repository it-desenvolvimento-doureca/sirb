import { TestBed, inject } from '@angular/core/testing';

import { GERDICOEMService } from './ger-dic-oem.service';

describe('GERDICOEMService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERDICOEMService]
    });
  });

  it('should be created', inject([GERDICOEMService], (service: GERDICOEMService) => {
    expect(service).toBeTruthy();
  }));
});
