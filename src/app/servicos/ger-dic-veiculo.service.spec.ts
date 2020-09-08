import { TestBed, inject } from '@angular/core/testing';

import { GERDICVEICULOService } from './ger-dic-veiculo.service';

describe('GERDICVEICULOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERDICVEICULOService]
    });
  });

  it('should be created', inject([GERDICVEICULOService], (service: GERDICVEICULOService) => {
    expect(service).toBeTruthy();
  }));
});
