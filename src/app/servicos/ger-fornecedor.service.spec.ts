import { TestBed, inject } from '@angular/core/testing';

import { GERFORNECEDORService } from './ger-fornecedor.service';

describe('GERFORNECEDORService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERFORNECEDORService]
    });
  });

  it('should be created', inject([GERFORNECEDORService], (service: GERFORNECEDORService) => {
    expect(service).toBeTruthy();
  }));
});
