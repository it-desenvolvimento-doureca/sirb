import { TestBed, inject } from '@angular/core/testing';

import { GERVISTASService } from './ger-vistas.service';

describe('GERVISTASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GERVISTASService]
    });
  });

  it('should be created', inject([GERVISTASService], (service: GERVISTASService) => {
    expect(service).toBeTruthy();
  }));
});
