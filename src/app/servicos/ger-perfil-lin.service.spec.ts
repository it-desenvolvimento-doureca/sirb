import { TestBed, inject } from '@angular/core/testing';

import { GERPERFILLINService } from './ger-perfil-lin.service';

describe('GERPERFILLINService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERPERFILLINService]
    });
  });

  it('should be created', inject([GERPERFILLINService], (service: GERPERFILLINService) => {
    expect(service).toBeTruthy();
  }));
});
