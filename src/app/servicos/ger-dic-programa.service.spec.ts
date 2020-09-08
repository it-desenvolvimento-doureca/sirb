import { TestBed, inject } from '@angular/core/testing';

import { GERDICPROGRAMAService } from './ger-dic-programa.service';

describe('GERDICPROGRAMAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERDICPROGRAMAService]
    });
  });

  it('should be created', inject([GERDICPROGRAMAService], (service: GERDICPROGRAMAService) => {
    expect(service).toBeTruthy();
  }));
});
