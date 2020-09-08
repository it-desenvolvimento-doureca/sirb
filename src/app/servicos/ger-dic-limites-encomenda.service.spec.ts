import { TestBed, inject } from '@angular/core/testing';

import { GERDICLIMITESENCOMENDAService } from './ger-dic-limites-encomenda.service';

describe('GERDICLIMITESENCOMENDAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERDICLIMITESENCOMENDAService]
    });
  });

  it('should be created', inject([GERDICLIMITESENCOMENDAService], (service: GERDICLIMITESENCOMENDAService) => {
    expect(service).toBeTruthy();
  }));
});
