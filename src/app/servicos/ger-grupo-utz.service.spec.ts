import { TestBed, inject } from '@angular/core/testing';

import { GERGRUPOUTZService } from './ger-grupo-utz.service';

describe('GERGRUPOUTZService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERGRUPOUTZService]
    });
  });

  it('should be created', inject([GERGRUPOUTZService], (service: GERGRUPOUTZService) => {
    expect(service).toBeTruthy();
  }));
});
