import { TestBed, inject } from '@angular/core/testing';

import { GERDICFABRICAService } from './ger-dic-fabrica.service';

describe('GERDICFABRICAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERDICFABRICAService]
    });
  });

  it('should be created', inject([GERDICFABRICAService], (service: GERDICFABRICAService) => {
    expect(service).toBeTruthy();
  }));
});
