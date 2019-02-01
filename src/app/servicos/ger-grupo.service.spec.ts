import { TestBed, inject } from '@angular/core/testing';

import { GERGRUPOService } from './ger-grupo.service';

describe('GERGRUPOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERGRUPOService]
    });
  });

  it('should be created', inject([GERGRUPOService], (service: GERGRUPOService) => {
    expect(service).toBeTruthy();
  }));
});
